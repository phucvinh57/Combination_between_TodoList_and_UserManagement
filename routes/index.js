var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.isLoggedIn === true) {
        res.redirect('/user');
        return;
    }
    res.render('index', { title: 'Event App' });
});
module.exports = router;
