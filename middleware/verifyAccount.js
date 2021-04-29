var data = require('../config/db.config');

var checkDuplicateUsernameOrEmail = function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    for(let i of data) {
        if(username == data.user.username || email == data.user.email) {
            console.log("Duplicate!\n");
            res.redirect('/');
            return;
        }
    }
    next();
}   

const verifyAccount = {
    checkDuplicateUsernameOrEmail
}

module.exports = verifyAccount;