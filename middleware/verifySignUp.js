var connection = require('../config/db.config');

var checkDuplicateUsernameOrEmail = function(req, res, next) {
    //Check duplicate username
    connection.query('SELECT Username FROM users WHERE username = ?', [req.body.username], function(err, results, fields) {
        if(results.length > 0) {
            //To do
            console.log('Username existed!');
            res.redirect('/signup');
            return;
        }
        //Check duplicate email
        connection.query('SELECT Email FROM users WHERE Email = ?',[req.body.email], function(err, results, fields) {
            if(results.length > 0) {
                //To do
                console.log('Email existed!');
                res.redirect('/signup');
                return;
            }
            next();
        });
    });
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;