var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function (socket) {
    socket.username = "anon"

    socket.on("change_username", function (data) {
        console.log(data.username)
        socket.username = data.username;
    });

    socket.on('chat message', function (msg) {
        io.emit('chat message', socket.username + ": " + msg);
        
        if (msg == secretword) {
            console.log("winner");
            io.emit("Winner")
        }
    });

    socket.on('drawing', function (data) {
        socket.broadcast.emit('drawing', data)
    });

    socket.on('clientSecretWord', function (clientSecretWord) {
        secretword = clientSecretWord;
        console.log(secretword);
    });

//    socket.on('message-to-server', function (msg) {
//        if (msg.message.indexOf(secretword) !== -1) {
//            console.log("winner");
//            io.emit("Winner")
//        }
//        clientSocket.broadcast.emit('message-to-client', msg);
//    });
//
});



http.listen(3000, function () {
    console.log('listening on *:3000');
});
