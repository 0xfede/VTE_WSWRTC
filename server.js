var express = require('express')
, app = express()
, http = require('http').Server(app)
, io = require('socket.io')(http)
, words = require('./english.json')
, _ = require('underscore')

app.use(express.static(__dirname));
app.get('/', function(req, res) {
  var _w = _.sample(words, 3);
  res.redirect('/' + _w[0] + '-' + _w[1] + '-' + _w[2]);
});
app.get('/:id', function(req, res) {
  res.render('client.ejs', { id: req.params.id });
});

io.on('connection', function(socket) {
  socket.roomId = socket.request._query.id;
  socket.join(socket.roomId);
  socket.on('sdp', function(data) {
    socket.to(socket.roomId).emit('sdp', data);
  });
  socket.on('ice', function(data) {
    socket.to(socket.roomId).emit('ice', data);
  });
});

http.listen(8080);


