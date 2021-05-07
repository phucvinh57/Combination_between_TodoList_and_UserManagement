var express = require('express');
var router = express.Router();
var authJwt = require('../middleware/authJwt');
var accController = require('../controllers/account.controller');
var eventController = require('../controllers/event.controller');
// View user's list of event
router.get('/lists', [authJwt.verifyToken], eventController.viewListEvent);
// View event on calendar
router.get('/home', [authJwt.verifyToken], eventController.viewCalendarEvent);
router.get('/', [authJwt.verifyToken], eventController.viewCalendarEvent);
// Setting
router.get('/setting', [authJwt.verifyToken], accController.getInfo);

// Render event with event id
router.get('/event', [authJwt.verifyToken], eventController.viewEvent);
// Get event form
router.get('/event/create-form', authJwt.verifyToken, eventController.createEventForm);

// Render data of users for searching
router.get('/event/search-members', authJwt.verifyToken, eventController.memberInfos);

//Create event 
router.get('/event/create', authJwt.verifyToken, eventController.createEvent);
// Delete event
router.get('/event/delete', authJwt.verifyToken, eventController.deleteEvent);
// Update event
router.get('/event/update', authJwt.verifyToken, eventController.updateEvent);


// Update info
router.post('/setting/change-info', authJwt.verifyToken, accController.updateInfo);
// Change password
router.post('/setting/change-password', authJwt.verifyToken, accController.changePassword);

module.exports = router;
