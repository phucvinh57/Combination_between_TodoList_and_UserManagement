var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var authJwt = require('../middleware/authJwt');

/* GET users listing. */
router.get('/profile', function(req, res, next) {
    // authJwt.verifyToken(req, res, next)
    controller.userAccess(req, res, 'profile');
});
router.get('/lists', function(req, res, next) {
    // authJwt.verifyToken(req, res, next)
    controller.userAccess(req, res, 'lists');
});
router.get('/home', function(req, res, next) {
    // authJwt.verifyToken(req, res, next)
    controller.userAccess(req, res, 'home');
});
router.get('/', function(req, res, next) {
    // authJwt.verifyToken(req, res, next)
    controller.userAccess(req, res, '');
});

module.exports = router;
