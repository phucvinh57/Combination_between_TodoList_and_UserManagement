var data = require('../config/db.config');
var fs = require('fs');

var createEvent = function(req, res) {
    res.send({msg: "create event"});
}

var memberInfos = function(req, res) {
    res.send(JSON.stringify(data.user_info));
}

var deleteEvent = function(req, res) {
    data.join.filter(function(value, index) {
        if(req.query.id == value.eventID) {
            data.join.splice(index, 1);
        }
    });
    data.event.filter(function(value, index) {
        if(req.query.id == value.ID) {
            data.event.splice(index, 1);
        }
    });
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    fs.writeFileSync('./mockdb/event.json', JSON.stringify(data.event));
    res.send({msg: "delete event"});
}

var updateEvent = function(req, res) {
    res.send({msg: "update event"});
}

var acceptEvent = function(req, res) {
    res.send({msg: "accept event"});
}

var chooseTime = function(req, res) {
    console.log(req.query.choose_time);
    data.join.find(function(i, index) {
        if(i.eventID == req.query.id) {
            data.join[index]['choose-time'] = req.query.choose_time; 
            return true;
        }
        return false;
    });
    fs.writeFile('./mockdb/join.json', JSON.stringify(data.join), () => {});
    res.send({msg: "Choose time for event"});
}

var viewEvent = function(req, res) {
    let event = data.event.find(function(i) {
        return i.ID == req.query.id;
    });
    let log = data.join.filter(function(i) {
        return event.ID == i.eventID;
    });
    let attendees = [];
    for(let i = 0; i < log.length; ++i) {
        let temp = data.user_info.forEach(function(val) {
            if(log[i].userID == val.ID) {
                attendees.push(val);
            }
        })
    }
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

var createEventForm = function(req, res) {
    res.render(`${req.role}/new-event`, {
        title: 'New Event'
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
    chooseTime,
    createEventForm,
    memberInfos
};