const config = require('../config/auth.config');
const connection = require('../config/db.config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = 9;
const expiresToken = 86400;

var signUp = function (req, res, next) {
    //Save user to database
    let username = req.body.username;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, salt);
    console.log(username, email, password);
    connection.query('INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)', [username, email, password], function (err, results) {
        connection.query('SELECT * FROM users WHERE Username = ?', [username], function (err, user) {
            connection.query('INSERT INTO user_roles VALUES (?, ?)', [user[0].ID, 2], function (err, result) {
                console.log('Sign up successfully!');
                // Sign a jwt token
                var token = jwt.sign({ id: user[0].ID, role: 'user' }, config.secret, {
                    expiresIn: expiresToken
                });
                res.cookie('token', token);
                // resolve({
                //     id: user[0].ID,
                //     username: user[0].Username,
                //     email: user[0].Email,
                //     role: 'user',
                // });
                next();
            });
        });
    });
}
var logIn = function (req, res, next) {
    console.log('Handling ...');
    connection.query('SELECT * FROM users WHERE Username = ?', [req.body.username], function (err, user) {
        if (user.length === 0) {
            console.log('Username does not exist!');
            res.redirect('/');
            return;
        }
        let isValidPassword = bcrypt.compareSync(req.body.password, user[0].Password);
        if (!isValidPassword) {
            console.log('Invalid password');
            res.redirect('/');
            return;
        }
        connection.query('SELECT * FROM user_roles WHERE userID = ?', [user[0].ID], function (err, user_role) {
            connection.query('SELECT * FROM roles WHERE ID = ?', [user_role[0].roleId], function (err, role) {
                var token = jwt.sign(
                    {
                        id: user[0].ID,
                        role: role[0].Name
                    },
                    config.secret,
                    { expiresIn: expiresToken }
                );
                res.cookie('token', token);
                //Data
                // resolve({
                //     id: user[0].ID,
                //     username: user[0].Username,
                //     email: user[0].Email,
                //     role: role[0].Name,
                // });
                next();
            });
        });
    });
}
var logOut = function(req, res, next) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    signUp: signUp,
    logIn: logIn,
    logOut: logOut
}