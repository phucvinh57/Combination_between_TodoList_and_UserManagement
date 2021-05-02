var data = require('../config/db.config');
var createEvent = function(req, res) {
    res.send({msg: "create event"});
}

var deleteEvent = function(req, res) {
    res.send({msg: "delete event"});
}

var updateEvent = function(req, res) {
    res.send({msg: "update event"});
}

var acceptEvent = function(req, res) {
    res.send({msg: "accept event"});
}

var chooseTime = function(req, res) {
    res.send({msg: "Choose time for event"});
}

var viewEvent = function(req, res) {
    let event = data.event.find(function(i) {
        return i.ID == req.query.id;
    });
    res.render(`${req.role}/event`, {
        title: 'event',
        event: event
    });
}

var viewCalendarEvent = function(req, res) {
    let user = data.user.find(function(value){
        return req.accID == value['ID'];
    });
    let user_event = data.user_event.find(function(value) {
        return req.accID == value['userID'];
    });
    let joinedEvent = data.event.filter(function(value, index){
        return user_event['joinedEvent'][index] == value['ID'];
    });
    let invitedEvent = data.event.filter(function(value, index){
        return user_event['invitedEvent'][index] == value['ID'];
    });
    res.render(`${req.role}/home`, {
        title: 'Home',
        user: user,
        joinedEvent: joinedEvent, 
        invitedEvent: invitedEvent
    });
}

var viewListEvent = function(req, res) {
    let user = data.user.find(function(value){
        return req.accID == value['ID'];
    });
    let user_event = data.user_event.find(function(value) {
        return req.accID == value['userID'];
    });
    let joinedEvent = data.event.filter(function(value, index){
        return user_event['joinedEvent'][index] == value['ID'];
    });
    
    res.render(`${req.role}/lists`, {
        title: 'Lists',
        user: user,
        joinedEvent: joinedEvent
    });
}

module.exports = {
    createEvent,
    deleteEvent,
    updateEvent,
    viewListEvent,
    viewCalendarEvent,
    viewEvent,
    acceptEvent,
    chooseTime
};