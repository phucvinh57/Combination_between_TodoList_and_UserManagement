var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.isLoggedIn === true) {
        res.redirect('/user');
        return;
    }
    res.render('index', { title: 'To-do List' });
});
router.get('/signup', function(req, res, next) {
    console.log(req.isLoggedIn);
    if(req.isLoggedIn === true) {
        res.redirect('/user');
        return;
    }
    res.render('signup', { title: 'Signup' });
});
module.exports = router;
