module.exports = function(io){

  io.on('connection', function(socket){

	  console.log('A user connected');

    socket.on('admin add', function(msg){
      socket.emit('admin add',msg);
    });

    socket.on('admin active', function(msg){
      socket.emit('admin active',msg);
    });

    socket.on('createCategory', function(msg){
      socket.emit('showCreateCategory',msg);
    });

    socket.on('updateCategory', function(msg){
      socket.emit('showUpdateCategory',msg);
    });

    socket.on('createPlan', function(msg){
      socket.emit('showCreatePlan',msg);
    });

    socket.on('updatePlan', function(msg){
      socket.emit('showUpdatePlan',msg);
    });

	  socket.on('disconnect', function(){
	  	console.log('User disconnected');
	  });

  });

}
