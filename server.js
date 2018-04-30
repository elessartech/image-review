var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000,');
});

// static files
app.use(express.static('public'));

// socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });


});
