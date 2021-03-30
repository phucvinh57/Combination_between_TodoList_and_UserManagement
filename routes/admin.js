var express = require('express');
var router = express.Router();

var authJwt = require('../middleware/authJwt');

/* GET home page. */
router.get('/index', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/home', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});
router.get('/', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/home', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

router.get('/list', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/list', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

router.get('/setting', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/setting', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

module.exports = router;
