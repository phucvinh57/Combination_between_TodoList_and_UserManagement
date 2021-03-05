var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
var verifySignUp = require('../middleware/verifySignUp');

/* Login */
router.post('/login', [controller.logIn], function(req, res, next) {
    res.redirect('/user');
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
