var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
var verifySignUp = require('../middleware/verifySignUp');

/* Login */
router.post('/login', function(req, res, next) {
    if(req.isLoggedIn === true) {
        res.redirect('/user');
        return;
    }
    async function handlingAsync() {
        var data = await controller.logIn(req, res);
        res.render('user/home', {
            title: 'Home'
            // data: data
        });
    }
    handlingAsync();
});
/* Signup */
router.post('/signup', function(req, res, next) {
    if(req.isLoggedIn === true) {
        res.redirect('/user');
        return;
    }
    async function handlingAsync() {
        await verifySignUp.checkDuplicateUsernameOrEmail(req, res);
        let data = await controller.signUp(req, res);
        req.isLoggedIn = true;
        res.render('user/home', {
            title: 'Home'
        })
    }
    handlingAsync();
});

module.exports = router;
