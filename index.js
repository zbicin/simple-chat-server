var fs = require('fs');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var readme = fs.readFileSync(path.join(__dirname, 'README.md'));
var port = getPort();

var messages = [];
var users = {};

io.origins('*:*');

app.get('/', function (req, res) {
    res.type('text/plain');
    res.send(readme);
    res.end();
});

io.on('connection', function (socket) {
    console.log('socket ' + socket.id + ' connected');
    socket.emit('user list', Object.values(users));
    socket.emit('chat history', messages);

    socket.on('user join', function (name) {
        console.log('socket ' + socket.id + ' is called "' + name + '"');
        users[socket.id] = name;
        io.emit('user join', name);
    });

    socket.on('disconnect', function () {
        console.log('user "' + users[socket.id] + '" disconnected');
        io.emit('user left', users[socket.id]);
        delete users[socket.id];
    });

    socket.on('chat message', function (msg) {
        msg.author = users[socket.id];
        io.emit('chat message', msg);
        if (messages.length > 9) {
            messages.shift();
        } else {
            messages.push(msg);
        }
    });
});

http.listen(port, function () {
    console.log('Server running on *:' + port);
});

function getPort() {
    var argumentIndex = process.argv.indexOf('--port');
    if (argumentIndex > -1) {
        return process.argv[argumentIndex + 1];
    }

    return process.env.SIMPLE_CHAT_SERVER_PORT || 3000;
}