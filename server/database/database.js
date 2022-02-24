const mysql = require('mysql2')

module.exports = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Nekochan1',
    database: 'DATABASE'
})