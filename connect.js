var mysql = require('mysql2');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'blog',
	multipleStatements: true
});

module.exports = connection;