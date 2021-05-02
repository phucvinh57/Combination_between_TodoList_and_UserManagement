// const config = require('../config/auth.config');
const data = require('../config/db.config');

function findUser(username, data) {
    for(let i of data) {
        if(i.username == username) return i;
    }
    return null;
}

var createAccount = function (req, res) {
    //Save user to database
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    data.push({
        "id": data.length,
        "username": username,
        "password": password
    })
}
var logIn = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = findUser(username, data.user);
    if(!user) {
        console.log("Username does not exist !\n");
        res.redirect('/');
        return;
    }
    if(password != user.password) {
        console.log("Invalid password! !\n");
        res.redirect('/');
        return;
    }
    res.cookie('role', user.role);
    res.cookie('account-ID', user.ID);
    res.cookie('isLoggedIn', true);
    req.role = user.role;
    res.redirect(`/${req.role}`);
    return;
}

var changePassword = function(req, res, next) {
    
}
var logOut = function(req, res, next) {
    res.clearCookie('isLoggedIn');
    res.clearCookie('role');
    res.clearCookie('account-ID')
    res.redirect('/');
}

module.exports = {
    createAccount,
    logIn,
    logOut,
    changePassword
}