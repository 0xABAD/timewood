package main

import (
	"fmt"
	"os"
	"os/signal"
	"time"

	"github.com/0xABAD/gooey"
)

const DEBUG = true

func main() {
	var (
		app    app
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

	server.Start(done, &app)
}

type app struct{}

func (a *app) Start(closed <-chan struct{}, incoming <-chan []byte, outgoing chan<- interface{}) {
	count := 0
	ticker := time.NewTicker(1 * time.Second)
	for {
		select {
		case <-closed:
			return
		case <-ticker.C:
			outgoing <- fmt.Sprintf("Message from server.  Count %d", count)
			count++
		}
	}
}
