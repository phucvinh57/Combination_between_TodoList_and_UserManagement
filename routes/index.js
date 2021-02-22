var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-do List' });
});
router.get('/lists', function(req, res, next) {
    res.render('lists', { title: 'To-do List' });
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Signup' });
});
router.get('/home', function(req, res, next) {
    res.render('home', {title: 'Home'});
})

module.exports = router;
