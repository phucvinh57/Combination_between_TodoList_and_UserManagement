const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const connection = require('../config/db.config');

var verifyToken = function (req, res, next) {
    let token = req.cookies['token'];
    if (!token) return res.status(403).send({
        message: 'No token provided!'
    });
   
    try {
        var decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        req.role = decoded.role;
        req.token = decoded;
        next();
    } catch(err) {
        res.status(403).send({message: 'Unauthorized! Please login!'});
    }
};

const authJwt = {
    verifyToken: verifyToken,
}

module.exports = authJwt;