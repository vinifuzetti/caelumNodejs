var mysql = require('mysql');

function connectionFactory(){
}

connectionFactory.prototype.getConnection=function(){
	return mysql.createConnection({
			host: 'localhost',
			database: 'cdc',
			user: 'root',
			password: ''
		});
};

module.exports=connectionFactory;