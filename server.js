var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)

{
  app.get('/', function(req, res) {
    res.sendfile('client.html');
  });
}

io.on('connection', function(socket) {
  socket.on('msg', function(data) {
    socket.broadcast.emit('msg', data);
  });
});

http.listen(8080);


