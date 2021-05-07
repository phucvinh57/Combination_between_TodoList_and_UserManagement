var express = require('express');
// Render event with event idvar express = require('express');
var router = express.Router();
var authJwt = require('../middleware/authJwt');
var accController = require('../controllers/account.controller');
var eventController = require('../controllers/event.controller');

// View user's list of event
router.get('/lists', [authJwt.verifyToken], eventController.viewListEvent);
// View event on calendar
router.get('/home', [authJwt.verifyToken], eventController.viewCalendarEvent);
router.get('/', [authJwt.verifyToken], eventController.viewCalendarEvent);

// Render event with event id
router.get('/event', [authJwt.verifyToken], eventController.viewEvent);
//Create event
router.get('/event/create', authJwt.verifyToken, eventController.createEvent);
// Delete event
router.get('/event/delete', authJwt.verifyToken, eventController.deleteEvent);
// Update event
router.get('/event/update', authJwt.verifyToken, eventController.updateEvent);

module.exports = router;

// Setting
router.get('/setting', [authJwt.verifyToken], accController.getInfo);


module.exports = router;
