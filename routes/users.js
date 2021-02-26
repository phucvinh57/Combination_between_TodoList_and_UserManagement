var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res, next) {
    res.render('user/profile', {title: 'Profile'});
});
router.get('/lists', function(req, res, next) {
    res.render('user/lists', { title: 'To-do List' });
});
router.get('/home', function(req, res, next) {
    res.render('user/home', {title: 'Home'});
});
router.get('/', function(req, res, next) {
    res.render('user/home', {title: 'Home'});
});

module.exports = router;
