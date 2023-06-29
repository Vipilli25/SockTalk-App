const io = require("socket.io")();

io.on("connection", socket => {
    console.log("a user has connected");
    socket.on("message", message => {
        console.log(message);
    });
});

io.listen(3001, function() {
    console.log("listening on port 3001");
});
