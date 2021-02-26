var connection = require('../config/db.config');

var checkDuplicateUsernameOrEmail = function(req, res, next) {
    //Check duplicate username
    connection.query(
        'SELECT Username FROM users WHERE username = ?',
        [req.body.username],
        function(err, results, fields) {
            if(results) {
                //To do
                res.status(400).send({
                    message: "Failed! Username is already in use!"
                });
            }
            return;
        }
    );
    //Check duplicate email
    connection.query(
        'SELECT Email FROM users WHERE Email = ?',
        [req.body.email],
        function(err, results, fields) {
            if(results) {
                //To do
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
            }
            return;
        }
    );
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;