module.exports = function(io){

  io.on('connection', function(socket){

	  console.log('A user connected');

    socket.on('admin add', function(msg){
      io.emit('admin add',msg);
    });

    socket.on('admin active', function(msg){
      io.emit('admin active',msg);
    });

	  socket.on('disconnect', function(){
	  	console.log('User disconnected');
	  });

  });

}
