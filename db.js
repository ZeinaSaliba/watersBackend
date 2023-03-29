const mysql = require('mysql');
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'watersdb',
});

module.exports = connection;