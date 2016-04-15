var ProdutoDaoMaluco = require('../../persist/produtoDao');

module.exports = function (app){

	app.get('/admin/promocao', function(req, res){

		var dao = new ProdutoDaoMaluco(app.get('connection')); //chama o construtor e pega a conexão

		dao.lista(function(errors, result, cols){
			res.format({
				json: function(){
					res.json(result);
				},
				html: function(){
					res.render('adminPromocao', {produtos: result});
				}
			});
		}); 
		
	});

	app.post('/admin/promocao', function(req, res){
		var livro = req.body;

		var dao = new ProdutoDaoMaluco(app.get('connection'));

		dao.promocao(livro, function(errors){
			if(errors){
				res.status(500);
				res.render('errors/500', {erroServer: errors});
				return;
			}
			res.redirect('/produtos');
		});

		dao.selectLivro(livro, function(errors, result){
			console.log(result);
			if(errors){
				res.status(500);
				res.render('errors/500', {erroServer: errors});
				return;
			}
			app.get('io').emit('promocaoLivro', result[0].titulo);
		});
	});

};
