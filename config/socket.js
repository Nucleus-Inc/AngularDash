var load = require('express-load');

module.exports = function(server){

  var io = require('socket.io').listen(server);

  load('sockets',{cwd: 'app'})
  	.into(io);

  return io;

}
