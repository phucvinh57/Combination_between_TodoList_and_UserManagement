var express = require('express');
var router = express.Router();

var authCtrler = require('../controllers/auth.controller');
var verifyAccount = require('../middleware/verifyAccount');

/* Login */
router.post('/login', [authCtrler.logIn]);
/* Signup */
router.post('/create', verifyAccount.checkDuplicateUsernameOrEmail, authCtrler.createAccount);
/* Logout */
router.post('/logout', authCtrler.logOut);

module.exports = router;
