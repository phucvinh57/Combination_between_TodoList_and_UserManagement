const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const connection = require('../config/db.config');

var verifyToken = function (req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({
        message: 'No token provided!'
    });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        next();
    });
};

var isAdmin = function (req, res, next) {
    //To do
    connection.query('SELECT * FROM user_roles WHERE userId = ?', [req.userId], function (err, user_role) {
        connection.query('SELECT * FROM roles WHERE roleId = ?', [user_role[0].roleId], function (err, role) {
            if (role[0].Name === 'admin') {
                next();
                return;
            }
            res.status(403).send({ message: 'Require Admin Role!' });
        });
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt;