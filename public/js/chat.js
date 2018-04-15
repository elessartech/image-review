// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('chat-comment-textarea'),
      handle = document.getElementById('chat-comment-handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('chat-messages');
//      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});


// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<li class="chat-message"><h1>' + data.handle + ': </h1>' + '<p>' + data.message + '</p>' + '</li>';
});

