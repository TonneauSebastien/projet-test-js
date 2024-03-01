// backend/db.js
const mysql = require('mysql');
// Remplacez ces valeurs par celles de votre configuration MySQL
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test'
});

exports.pool = pool;
