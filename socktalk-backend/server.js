
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const messagehandler = require("./handlers/message_handler");
const port = 3001;

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use (cors());

let currUserId = 2;

const users = {};

function createUserAvatar () {
    const rand1 = Math.round(Math.random() * 200 + 100);
    const rand2 = Math.round(Math.random() * 200 + 100);
    return `https://placeimg.com/${rand1}/${rand2}/any`;
}

io.on("connection", socket => {
    console.log(socket.id);
    users[socket.id] = {userId : currUserId++};
    socket.on("join", (username) => {
        users[socket.id].username = username;
        users[socket.id].avatar = createUserAvatar();
        console.log(`${username} joined the chat`);
        messagehandler.handleMessage(socket, users);
    });   
});

server.listen(3001, () => console.log(`Server is running on port 3001`));
