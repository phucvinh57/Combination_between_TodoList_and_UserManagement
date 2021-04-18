var express = require('express');
var router = express.Router();

var authJwt = require('../middleware/authJwt');

/* GET home page. */
router.get('/', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/list-events', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

router.get('/event-lists', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/list-events', { title: 'Admin' });
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

router.get('/accounts', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        res.render('admin/accounts', { title: 'Admin' });
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
router.get('/recycle-bin', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') {
        // res.render('admin/setting', { title: 'Admin' });
        res.status(200).send({ msg: 'Recyle Bin, which is used for recycle deleted events'});
    }
    else {
        res.status(403).send({ message: 'Required admin role'})
    }
});

module.exports = router;
