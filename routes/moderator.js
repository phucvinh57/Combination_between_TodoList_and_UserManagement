var express = require('express');
var router = express.Router();

var authJwt = require('../middleware/authJwt');

router.get('/index', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'moderator') {
        res.render('moderator/home', { title: 'Moderator' });
    }
    else {
        res.status(403).send({ message: 'Required moderator role'})
    }
});
router.get('/', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'moderator') {
        res.render('moderator/home', { title: 'Moderator' });
    }
    else {
        res.status(403).send({ message: 'Required moderator role'})
    }
});

router.get('/lists', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'moderator') {
        res.render('moderator/lists', { title: 'Moderator' });
    }
    else {
        res.status(403).send({ message: 'Required moderator role'})
    }
});

router.get('/setting', authJwt.verifyToken, function(req, res, next) {
    if(req.role === 'moderator') {
        res.render('moderator/setting', { title: 'Moderator' });
    }
    else {
        res.status(403).send({ message: 'Required moderator role'})
    }
});

module.exports = router;
