var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
const authJwt = require('../middleware/authJwt');
var verifySignUp = require('../middleware/verifySignUp');

/* Login */
router.post('/login', [controller.logIn], function(req, res, next) {
    console.log(req.role);
    if(req.role === 'user') {
        res.redirect('/user');
    }
    else if(req.role === 'admin') {
        res.redirect('/admin');
    }
    else if(req.role === 'moderator') {
        res.redirect('/mod');
    }
    return;
});
/* Signup */
router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, controller.signUp],function(req, res, next) {
    res.redirect('/user');
    return;
});
/* Logout */
router.post('/logout', controller.logOut);

module.exports = router;
