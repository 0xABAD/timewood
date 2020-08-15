package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

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
	ticker := time.NewTicker(2 * time.Second)
	for {
		select {
		case <-closed:
			return
		case msg := <-a.message:
			outgoing <- msg
		case <-ticker.C:
			outgoing <- SAMPLE_TREES
		}
	}
}

const SAMPLE_TREES = `{
    "meta": {
        "foo": 2,
        "bar": 3,
        "quux": "baz"
    },
    "trees": [
        {
            "name": "gather",
            "params": ["*room"],
            "args": ["r0"],
            "id": 47,
            "result": 0,
            "max_arg_length": 24,
            "long_arg_trunc": 6,
            "root": {
                "name": "⇶",
                "result": 0,
                "args": [2],
                "id": 47,
                "children": [
                    {
                        "name": "?",
                        "result": 0,
                        "id": 47,
                        "children": [
                            {
                                "name": "Room Max Level",
                                "params": ["*room"],
                                "args": ["sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Carry Creep Available",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "!",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "name": "Creep Energy Full",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Spawn Energy Near Full",
                                        "params": ["?spawn"],
                                        "args": ["?spawn"],
                                        "result": -1,
                                        "id": -1
                                    },
                                    {
                                        "name": "Creep Collect Energy",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["*creep", "*spawn"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Have Creep With Energy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Spawn Energy Near Full",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "name": "Upgrade Room",
                                        "params": ["*creep", "*room"],
                                        "args": ["*creep", "*room"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Spawn Energy Full",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "name": "Build Creep",
                                        "params": ["*spawn"],
                                        "args": ["*spawn"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "?",
                        "result": 1,
                        "id": 47,
                        "children": [
                            {
                                "name": "Spawn Energy Full",
                                "params": ["?spawn", "*room"],
                                "args": ["988056402dad25aba66e5af5", "sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Source Has Energy",
                                        "params": ["?source", "*room"],
                                        "args": ["7edd613592480bac57da3d7f", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Work Creep Available",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "!",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "name": "Creep Energy Full",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Harvest Energy",
                                        "params": ["*creep", "*source"],
                                        "args": ["*creep", "*source"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 1,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Have Creep With Energy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Transfer Energy To Spawn",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["76d162e718c9f1ab51413dfc", "988056402dad25aba66e5af5"],
                                        "result": 1,
                                        "id": 47,
                                        "isAction": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]
}`
