//funcao construtora, usa o new para chamar ela
function produtoDao (connection){
	this._connection = connection;
}

//this se torna o node inteiro, por isso precisamos fazer uma function construtora
//prototype e para carregar os metodos na classe que estou exportando para uso externo
produtoDao.prototype.lista = function(callback){
	this._connection.query('select * from produtos', callback);
}

//para qualquer comando em bd basta seguir o padrão acima
produtoDao.prototype.salva = function(produtoToInsert, callback){
	this._connection.query('insert into produtos set ?', produtoToInsert, callback);
}

produtoDao.prototype.promocao = function(produtoToAlter, callback){
	this._connection.query('update produtos set preco = (preco - (0.1*preco)) where id = ?', produtoToAlter.id, callback);
}

produtoDao.prototype.selectLivro = function(produto, callback){
	this._connection.query('select titulo from produtos where id = ?', produto.id, callback);
}

module.exports = produtoDao;