var app = require('../../config/custom-express')();
var reqSt = require('supertest')(app);

//done é uma variavel que é colocada para executar a verificação após o retorno da req
describe('ProdutoRota', function(){
	it('lista produtos com html', function(done){
		reqSt.get('/produtos')
			 .set('Accept', 'text/html')
			 .expect('Content-type', /html/)
			 .expect(200, done);
	});
	it('não adiciona livro sem título', function(terminou){
		reqSt.post('/produtos')
		     .send({'titulo':'', 'preco':33, 'descricao':'descricao escrita pelo user'})
		     .expect(400, terminou);
	});
});