// const jwt = require('jsonwebtoken');
// const config = require('../config/auth.config');
// const connection = require('../config/db.config');

var verifyToken = function (req, res, next) {
    let role = req.cookies['role'];
    req.role = role;
    next();
};

module.exports = {
    verifyToken
};