var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.cookies['isLoggedIn']);
    if(req.cookies['isLoggedIn'] == true) {
        res.redirect(`/${req.cookies['role']}`);
        return;
    }
    res.render('index', { title: 'Event App' });
});
module.exports = router;
