var express = require('express');
var router = express.Router();
var authJwt = require('../middleware/authJwt');
var data = require('../config/db.config');
var eventController = require('../controllers/event.controller');
var accController = require('../controllers/account.controller');

// View user's list of event
router.get('/lists', authJwt.verifyToken, eventController.viewListEvent);
// View event on calendar
router.get('/home', [authJwt.verifyToken], eventController.viewCalendarEvent);
router.get('/', [authJwt.verifyToken], eventController.viewCalendarEvent);
// Setting
router.get('/setting', [authJwt.verifyToken], accController.getInfo);
// Render event with event id
router.get('/event', [authJwt.verifyToken], eventController.viewEvent);

// Accept event invitation
router.get('/event/accept', authJwt.verifyToken, eventController.acceptEvent);
// Choose time for event
router.get('/event/choose-time', authJwt.verifyToken, eventController.chooseTime);

// Update info
router.post('/setting/change-info', authJwt.verifyToken, accController.updateInfo);
// Change password
router.post('/setting/change-password', authJwt.verifyToken, accController.changePassword);
module.exports = router;
