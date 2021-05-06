var data = require('../config/db.config');
var fs = require('fs');
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
    data.join.find(function(i, index) {
        if(i.eventID == req.query.id) {
            data.join[index]['choose-time'] = req.query.choose_time; 
            return true;
        }
        return false;
    });
    fs.writeFile('./mockdb/join.json', JSON.stringify(data.join), () => {});
    // fs.readFile('../mockdb/join.json', function(err, data) {
    //     console.log(data);
    // })
    res.send({msg: "Choose time for event"});
}

var viewEvent = function(req, res) {
    let event = data.event.find(function(i) {
        return i.ID == req.query.id;
    });
    let log = data.join.filter(function(i) {
        return event.ID == i.eventID;
    });
    console.log(log);
    let attendees = [];
    for(let i = 0; i < log.length; ++i) {
        let temp = data.user_info.find(function(val) {
            return log[i].eventID == val.ID;
        });
        attendees.push(temp);
    }
    console.log(attendees);
    res.render(`${req.role}/event`, {
        title: 'event',
        event: event,
        role: req.role,
        attendees: attendees
    });
}

var viewCalendarEvent = function(req, res) {
    let user_info = data.user_info.find(function(value){
        return req.accID == value.ID;
    });
    var log = data.join.filter(function(value) {
        return user_info.ID == value.userID;
    });
    var event = [];
    for(let i = 0; i < log.length; ++i) {
        let temp = data.event.find(function(val) {
            return log[i].eventID == val.ID;
        });
        event.push(temp);
    }
    res.render(`${req.role}/home`, {
        title: 'Home',
        user: user_info,
        event: event
    });
}

var viewListEvent = function(req, res) {
    let user_info = data.user_info.find(function(value){
        return req.accID == value.ID;
    });
    var log = data.join.filter(function(value) {
        return user_info.ID == value.userID;
    });
    var event = [];
    for(let i = 0; i < log.length; ++i) {
        let temp = data.event.find(function(val) {
            return log[i].eventID == val.ID;
        });
        event.push(temp);
    }
    
    res.render(`${req.role}/lists`, {
        title: 'Lists',
        user: user_info,
        event: event
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