var express = require('express');
var router = express.Router();

var authJwt = require('../middleware/authJwt');

/* GET home page. */
router.get('/', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin')
        res.render('admin/home', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});
router.get('/home', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/home', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});
router.get('/event', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/event', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});
router.get('/event/create', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/new-event', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});

router.get('/lists', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/list-events', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});

router.get('/accounts', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/accounts', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});

router.get('/setting', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.render('admin/setting', { title: 'Admin' });
    else res.status(403).send({ message: 'Required admin role'})
});
router.get('/recycle-bin', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'admin') 
        res.status(200).send({ msg: 'Recyle Bin, which is used for recycle deleted events'});
    else res.status(403).send({ message: 'Required admin role'})
});

module.exports = router;
