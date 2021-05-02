// const jwt = require('jsonwebtoken');
// const config = require('../config/auth.config');
// const connection = require('../config/db.config');

var verifyToken = function (req, res, next) {
    req.accID = req.cookies['account-ID'];
    req.role = req.cookies['role'];

    var role = req.originalUrl.slice(1);
    let endIndex = role.indexOf('/');
    if(endIndex == -1) endIndex = role.length;
    role = role.slice(0, endIndex);
    
    if(req.role != role) {
        res.status(403).send({ msg: `Require ${role} role`});
        return;
    }
    next();
};

module.exports = {
    verifyToken
};