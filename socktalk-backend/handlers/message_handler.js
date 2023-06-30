
let currMessageId = 1;

function createMessageobj(user,message){
    return {
        _id: currMessageId++,
        text: message,
        createdAt: new Date(),
        user: {
          _id: user.userId,
          name: user.username,
          avatar: user.avatar,
        }
      };
}

function handleMessage(socket, users){
    socket.on("message", message => {
        const user = users[socket.id];
        const messageobj = createMessageobj(user,message);
        console.log(messageobj);
        socket.broadcast.emit("message", messageobj);
    });
}

module.exports = { handleMessage };