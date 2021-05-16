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
// Get list of account
router.get('/accounts', authJwt.verifyToken, accController.listAccounts);
// Admin change account property
router.post('/accounts/edit', authJwt.verifyToken, accController.editAccount);

// Get event form
router.get('/event/create-form', authJwt.verifyToken, eventController.createEventForm);
//Create event
router.post('/event/create', authJwt.verifyToken, eventController.createEvent);
// Delete event
router.get('/event/delete', authJwt.verifyToken, eventController.deleteEvent);
// Update event
router.post('/event/update', authJwt.verifyToken, eventController.updateEvent);

router.get('/event/member-search', authJwt.verifyToken, accController.memberSearch);
router.get('/event/get-team', authJwt.verifyToken, accController.getTeamMember);

module.exports = router;

// Setting
router.get('/setting', [authJwt.verifyToken], accController.getInfo);
router.post('/setting/change-info', authJwt.verifyToken, accController.updateInfo);
router.post('/setting/change-password', authJwt.verifyToken, accController.changePassword);

module.exports = router;
