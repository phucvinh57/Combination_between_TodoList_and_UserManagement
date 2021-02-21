var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-do List' });
});
router.get('/home', function(req, res, next) {
    res.render('home', { title: 'To-do List' });
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Signup' });
});

module.exports = router;
