// make connection
const socket = io.connect('http://localhost:5000');

// query DOM
const message = document.querySelector('#chat-comment-textarea'),
      handle = document.querySelector('#chat-comment-handle'),
      sendBtn = document.querySelector('#send'),
      output = document.querySelector('#chat-messages');

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

