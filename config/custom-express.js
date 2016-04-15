var exp = require('express');
var bp = require('body-parser');

module.exports = function(){
	var app = exp(); //para poder instanciar mais de uma app
	app.set('view engine', 'ejs');

	//bodyparser para tratar entrada
	app.use(bp.urlencoded({extended:true}));
	app.use(bp.json());

	//middleware de conexões, poderia fazer qualquer intermediario de req 
	app.use(function(req, res, next){
		var Cf = require('../persist/connectionFactory.js');
		var conn = new Cf().getConnection();
		app.set('connection', conn);
		next();
		conn.end();
	});

	//validador de dados inputados
	app.use(require('express-validator')());

	//rotas usadas
	require('../routes/produtos')(app);
	require('../routes/admin/promocao')(app);
	
	return app;
};