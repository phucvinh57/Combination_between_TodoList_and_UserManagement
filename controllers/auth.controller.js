const config = require('../config/auth.config');
const connection = require('../config/db.config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = 9;

var signUp = function(req, res) {
    //Save user to database
    let username = req.body.username;
    let email = req.body.email
    let password = bcrypt.hashSync(req.body.password, salt);
    connection.query(
        'INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)',
        [username, email, password],
        function(err, user) {
            connection.query(`INSERT INTO user_roles (${user[0].ID}, ${2})`);
        }
    );
}
var logIn = function(req, res) {
    connection.query('SELECT * FROM users WHERE Username = ?', [req.body.username], function(err, user) {
        if(!user) {
            //Try to login again
            return;
        }
        let isValidPassword = bcrypt.compareSync(req.body.password, user[0].Password);
        if(!isValidPassword) {
            //Try to login again
            return;
        }
        var token = jwt.sign({id: user[0].ID}, config.secret, {
            expiresIn: 86400
        });
        connection.query('SELECT * FROM user_roles WHERE userID = ?', [user[0].ID], function(err, user_role) {
            connection.query('SELECT * FROM roles WHERE ID = ?', [user_role[0].roleID], function(err, role) {
                res.status(200).send({
                    id: user.ID,
                    username: user.Username,
                    email: user.Email,
                    role: role[0].Name,
                    accessToken: token
                });
            });
        });
    });
}

module.exports = {
    signUp: signUp,
    logIn: logIn
}