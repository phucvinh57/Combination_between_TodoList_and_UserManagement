var express = require('express');
var router = express.Router();
var authJwt = require('../middleware/authJwt');

// View user's list of event
router.get('/lists', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/lists', { title: 'Lists' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
// View event on calendar
router.get('/home', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/home', { title: 'Home' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
router.get('/', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/home', { title: 'Home' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
router.get('/setting', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/setting', { title: 'Setting' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
router.get('/event', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/event', { title: 'Event' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});

module.exports = router;
