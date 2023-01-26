package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/creamdog/gonfig"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }} // use default options
var mouseRecord = [][]string{{"Timestamp", "Mouse_X", "Mouse_Y", "Level"}}
var levelRecord = [][]string{{"Timestamp", "Level", "Score"}}

type Msg struct {
	Id   string
	Type string
	Data []string
}

type User struct {
	ID      string
	Outpath string
}

func (user *User) append(data []string, records [][]string, appendix string) {
	currentTime := time.Now()
	filename    := fmt.Sprintf("%s_%s.csv", currentTime.Format("2006-01-02"), appendix)
	outpath     := filepath.Join(user.Outpath, filename)

	f, _ := os.OpenFile(outpath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	w    := csv.NewWriter(f)

	info, _ := f.Stat()

	if info.Size() == 0 {
		w.WriteAll(records)
	}

	w.WriteAll([][]string{data})

	defer f.Close()
}

var users map[string]User
var actualOutPath string

func checkUser(id string) User {
	_, found    := users[id]
	userOutPath := filepath.Join(actualOutPath, id)

	if !found {
		os.MkdirAll(userOutPath, os.ModePerm)
	}

	users[id] = User{ID: id, Outpath: userOutPath}
	return users[id]
}

func decodeJson(s []byte, msg *Msg) error {
	return json.Unmarshal(s, msg)
}

func handleAction(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New connection...")
	c, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		return
	}

	defer c.Close()

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			break
		}

		var msg Msg
		err2 := decodeJson(message, &msg)

		if err2 != nil {
			continue
		}

		_, err3 := strconv.Atoi(msg.Id)

		if err3 != nil {
			continue
		}

		user := checkUser(msg.Id)

		switch msg.Type {
		case "1":
			user.append(msg.Data, mouseRecord, "Mouse")
		case "2":
			user.append(msg.Data, levelRecord, "Level")

		}
	}
}

func getExecPath() string {
	ex, err := os.Executable()

	if err != nil {
		panic(err)
	}

	exPath := filepath.Dir(ex)
	return exPath
}

func readUserDir(path string) {
	files, _ := ioutil.ReadDir(path)

	for _, file := range files {
		users[file.Name()] = User{
			ID:      file.Name(),
			Outpath: filepath.Join(path, file.Name()),
		}
	}
}

func getPath(path, execPath string) string{
	if filepath.IsAbs(path) {
		return path
	}

	return filepath.Join(execPath, path)
}

func main() {
	users = make(map[string]User)
	file, _   := os.Open("config.json")
	config, _ := gonfig.FromJson(file)
	path, _   := config.GetString("userDir", "../users")
	port, _   := config.GetString("port", "3366")

	execPath := getExecPath()
	actualOutPath = getPath(path, execPath)

	readUserDir(actualOutPath)

	mux := http.NewServeMux()
	fs  := http.FileServer(http.Dir("../client"))

	mux.Handle("/", fs)
	mux.HandleFunc("/api/action", handleAction)
	fmt.Println("Listing on: ", fmt.Sprintf("0.0.0.0:%s", port))
	fmt.Println("Out path: ", actualOutPath)
	http.ListenAndServe(fmt.Sprintf("0.0.0.0:%s", port), mux)
}