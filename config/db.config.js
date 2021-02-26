const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: root,
    password: 'phucvinh',
    database: 'todoapp'
});
connection.connect(function(err) {
    if(err) console.log(err);
    else console.log('Database was connected!');
});

module.exports = connection;