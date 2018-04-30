// make connection
var socket = io.connect('http://localhost:3000');

// query DOM
var message = document.getElementById('chat-comment-textarea'),
      handle = document.getElementById('chat-comment-handle'),
      sendBtn = document.getElementById('send'),
      output = document.getElementById('chat-messages');

// emit events
sendBtn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});


// listen for events
socket.on('chat', function(data){
    if (data.message.replace(/ /g,'').length < 35)
    output.innerHTML += '<li class="chat-message"><h1>' + data.handle + ': </h1>' + '<p>' + data.message + '</p>' + '</li>';
});

