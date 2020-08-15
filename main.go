package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/0xABAD/gooey"
)

const DEBUG = false

func main() {
	var (
		app    = app{message: make(chan string)}
		notify = make(chan os.Signal)
		done   = make(chan struct{})
		server = gooey.Server{IndexHtml: INDEX}
	)

	if DEBUG {
		server.WebServeDir = "web"
		server.ReloadWatchDir = "web/src"
	}

	signal.Notify(notify, os.Kill, os.Interrupt)
	go func() {
		<-notify
		close(done)
	}()

	http.HandleFunc("/tree", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Printf("[ERROR] Failed to read request: %s", err)
			return
		}

		w.WriteHeader(http.StatusOK)
		app.message <- string(body)
	})
	go func() {
		log.Fatal(http.ListenAndServe(":18900", nil))
	}()

	server.Start(done, &app)
}

type app struct {
	message chan string
}

func (a *app) Start(closed <-chan struct{}, incoming <-chan []byte, outgoing chan<- interface{}) {
	for {
		select {
		case <-closed:
			return
		case msg := <-a.message:
			outgoing <- msg
		}
	}
}
