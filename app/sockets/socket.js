module.exports = function(io){

  io.on('connection', function(socket){

	  console.log('A user connected');

    socket.on('admin add', function(msg){
      io.emit('admin add',msg);
    });

    socket.on('admin active', function(msg){
      io.emit('admin active',msg);
    });

    socket.on('category create', function(msg){
      io.emit('category create',msg);
    });

    socket.on('category update', function(msg){
      io.emit('category update',msg);
    });

	  socket.on('disconnect', function(){
	  	console.log('User disconnected');
	  });

  });

}
