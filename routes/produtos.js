//var connectionFactory = require('../persist/connectionFactory');
var ProdutoDaoMaluco = require('../persist/produtoDao');

module.exports = function (app){


	app.get('/', function(req, res){
		res.redirect('/produtos');
	});

	app.get('/produtos', function(req, res){

		//var con = new connectionFactory().getConnection();
		var dao = new ProdutoDaoMaluco(app.get('connection')); //chama o construtor e pega a conexão

		dao.lista(function(errors, result, cols){
			res.format({
				json: function(){
					res.json(result);
				},
				html: function(){
					res.render('lista', {produtos: result});
				}
			});
		}); 
		
	});

	app.get('/produtos/cadastroProduto', function(req, res){
		res.render('formCadastroProd');
	});

	app.post('/produtos', function(req, res){
		var livro = req.body;

		var dao = new ProdutoDaoMaluco(app.get('connection'));

		dao.salva(livro, function(errors){
			res.redirect('/produtos');
		});
	});

};
