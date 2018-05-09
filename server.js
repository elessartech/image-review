const express = require('express');
const socket = require('socket.io');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000)

// app setup
const app = express();

const server = app.listen(PORT, err =>{
    if (err) throw err

    console.log('listening for requests on port 5000,');
});

// static files
app.use(express.static('public'));

// socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });


});