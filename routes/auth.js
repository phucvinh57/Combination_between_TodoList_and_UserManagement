var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
var verifySignUp = require('../middleware/verifySignUp');

/* GET home page. */
router.post('/login', function(req, res, next) {
    controller.logIn(req, res);
});
router.post('/signup', function(req, res, next) {
    verifySignUp.checkDuplicateUsernameOrEmail(req, res, next);
    res.redirect('/user');
    // controller.signUp(req, res);
});

module.exports = router;
