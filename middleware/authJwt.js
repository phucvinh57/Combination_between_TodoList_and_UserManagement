const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const connection = require('../config/db.config');

var verifyToken = function(req, res, next) {
    let token = req.headers['x-access-token'];
    if(!token) return res.status(403).send({
        message: 'No token provided!'
    });

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        next();
    });
};

var isAdmin = function(req, res, next) {
    //To do
    connection.query(
        'SELECT * FROM user_roles WHERE userId = ?',
        [req.userId], 
        function(err, result) {
            connection.query(
                'SELECT * FROM roles WHERE roleId = ?',
                [result.roleId],
                function(err, _result) {
                    if(_result.name === 'admin'){
                        next();
                        return;
                    }
                    res.status(403).send({message: 'Require Admin Role!'});
                }
            );
        }
    );
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt;