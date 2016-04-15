var mysql = require('mysql');

function connectionFactory(){
}

connectionFactory.prototype.getConnection=function(){
	 config = {
			host: 'localhost',
			database: 'cdc',
			user: 'root',
			password: ''
	 }
	 if(process.env.NODE_ENV == 'test'){
	 	config.database='cdc_test';
	 }
	 
	 return mysql.createConnection(config);
};

module.exports=connectionFactory;