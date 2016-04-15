var app = require('./config/custom-express')();

var server = app.listen(3000, function(){ 
	//garantia de ordem de exec, Node e assincrono
	console.log('Servidor subiu na porta',server.address().port);
	//console.log(app); //mostra o que tem dentro do app
	
});

var socketIo = require('socket.io');
var io = socketIo(server);

app.set('io', io);