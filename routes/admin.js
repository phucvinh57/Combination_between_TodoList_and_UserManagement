var express = require('express');
var router = express.Router();

var authJwt = require('../middleware/authJwt');

/* GET home page. */
router.get('/index', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/index', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});
router.get('/', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/index', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

module.exports = router;
