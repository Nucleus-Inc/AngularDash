module.exports = function(io){

  io.on('connection', function(socket){

	  console.log('A user connected');

    socket.on('admin add', function(msg){
      socket.broadcast.emit('admin add',msg);
      io.emit('admin add',msg);
    });

    socket.on('admin active', function(msg){
      socket.broadcast.emit('admin active',msg);
      io.emit('admin active',msg);
    });

    socket.on('createCategory', function(msg){
      socket.broadcast.emit('showCreateCategory',msg);
      io.emit('showCreateCategory',msg);
    });

    socket.on('updateCategory', function(msg){
      socket.broadcast.emit('showUpdateCategory',msg);
      io.emit('showUpdateCategory',msg);
    });

    socket.on('createPlan', function(msg){
      socket.broadcast.emit('showCreatePlan',msg);
      io.emit('showCreatePlan',msg);
    });

    socket.on('updatePlan', function(msg){
      socket.broadcast.emit('showUpdatePlan',msg);
      io.emit('showUpdatePlan',msg);
    });

	  socket.on('disconnect', function(){
	  	console.log('User disconnected');
	  });

  });

}
