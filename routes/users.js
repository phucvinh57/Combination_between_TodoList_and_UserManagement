var express = require('express');
var router = express.Router();
var authJwt = require('../middleware/authJwt');

/* GET users listing. */
router.get('/profile', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/profile', { title: 'Profile' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
router.get('/lists', [authJwt.verifyToken], function (req, res, next) {
    if (req.role === 'user') {
        res.render('user/lists', { title: 'Lists' });
    } else {
        res.status(403).send({ message: 'Require user role' })
    }
});
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

module.exports = router;
