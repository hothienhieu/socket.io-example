
let userName = `User${Math.floor(Math.random() * 1000000)}`;
var socket = io({
    auth: {
      username: userName
    }
  });
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', { user: userName, msg: input.value});
        input.value = '';
    }
});

socket.on('chat message', function (data) {
    var item = document.createElement('li');
    item.textContent = `${data.user}: ${data.msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('broadcast', function (data) {
    if (data.user === userName) {
        var item = document.createElement('li');
        item.textContent = `Server: ${data.msg} ${data.user}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }
});
