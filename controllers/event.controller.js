var data = require('../config/db.config');
var fs = require('fs');

var createEvent = function (req, res) {
    var eventData = JSON.parse(req.body.data);
    var newEvent = {};
    if (data.event.length == 0) newEvent.ID = 1;
    else newEvent.ID = data.event[data.event.length - 1].ID + 1;

    // Copy data from user form post
    newEvent.name = eventData.name;
    newEvent['start-time'] = eventData.startTime;
    newEvent['end-time'] = eventData.endTime;
    newEvent.preference = eventData.preference;
    newEvent.description = eventData.description;
    newEvent.location = eventData.location;
    newEvent.score = parseInt(eventData.score);
    newEvent['recommended-time'] = eventData['listTimeRecommend'];
    var responsibleUser = data.user_info.find(function (value) {
        return value.ID == req.accID;
    });
    newEvent.responsible = responsibleUser.name;

    // Set tracking to new event for all moderators and admins
    data.user.filter(function (value) {
        if (value.role == 'admin' || value.role == 'mod') {
            if (!eventData['attendeesID'].includes(value.ID))
                eventData['attendeesID'].push(value.ID);
            return true;
        }
        return false;
    });

    // Push all attendees and trackers to list of join record
    for (let i = 0; i < eventData['attendeesID'].length; i++) {
        var temp = {};
        temp.eventID = newEvent.ID;
        temp.userID = parseInt(eventData['attendeesID'][i]);
        temp.attended = false;
        temp['choose-time'] = [];
        for (let j = 0; j < newEvent['recommended-time'].length; j++) {
            temp['choose-time'].push(false);
        }
        temp.invite = false;
        data.join.push(temp);
    }

    // Push a new event to list of event
    data.event.push(newEvent);

    fs.writeFileSync('./mockdb/event.json', JSON.stringify(data.event));
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    res.send({ msg: "create event" });
}
var updateEvent = function (req, res) {
    var eventData = JSON.parse(req.body.data);
    var event = data.event.find(function (value) {
        return value.ID == parseInt(eventData.ID);
    });
    event.name = eventData.name;
    event['start-time'] = eventData.startTime;
    event['end-time'] = eventData.endTime;
    event.preference = eventData.preference;
    event.description = eventData.description;
    event.location = eventData.location;
    event.score = parseInt(eventData.score);
    event['recommended-time'] = eventData['listTimeRecommend'];
    var responsibleUser = data.user_info.find(function (value) {
        return value.ID == req.accID;
    });
    event.responsible = responsibleUser.name;

    var join = data.join.filter(function (value) {
        return value.eventID == event.ID;
    })
    var oldListAttendees = [];
    var newListAttendees = [];
    join.filter(function (value) {
        if (value.eventID == event.ID) {
            oldListAttendees.push(value.userID);
            return true;
        }
        return false;
    });
    eventData['attendeesID'].forEach(function (value) {
        newListAttendees.push(parseInt(value));
    });

    // Get list of user ID and mod ID
    var mod_user_ID = [];
    data.user.filter(function (value) {
        if (value.role == 'admin' || value.role == 'mod') {
            mod_user_ID.push(value.ID);
            return true;
        }
        return false;
    });

    //deletes contains all join to delete
    var deletes = oldListAttendees.filter(function (value) {
        return !newListAttendees.includes(value) && !mod_user_ID.includes(value);
    })
    //deletes contains all join to add
    var adds = newListAttendees.filter(function (value) {
        return !oldListAttendees.includes(value);
    });
    console.log(deletes);
    console.log(adds);

    // Delete join
    deletes.forEach(function (id) {
        data.join.find(function (value, index) {
            if (id == value.userID && event.ID == value.eventID) {
                data.join.splice(index, 1);
                return true;
            }
            return false;
        });
    });

    // Add new join
    adds.forEach(function (id) {
        var temp = {};
        temp.eventID = event.ID;
        temp.userID = id;
        temp.attended = false;
        temp['choose-time'] = [];
        for (let j = 0; j < event['recommended-time'].length; j++) {
            temp['choose-time'].push(false);
        }
        temp.invite = false;
        data.join.push(temp);
    })
    fs.writeFileSync('./mockdb/event.json', JSON.stringify(data.event));
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    res.send({ msg: "update event" });
}

var deleteEvent = function (req, res) {
    console.log(req.query.id);
    data.join = data.join.filter(function (value, index) {
        return req.query.id != value.eventID;
    });

    data.event = data.event.filter(function (value, index) {
        return req.query.id != value.ID;
    });
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    fs.writeFileSync('./mockdb/event.json', JSON.stringify(data.event));
    res.send({ msg: "delete event" });
}

var acceptEvent = function (req, res) {
    res.send({ msg: "accept event" });
}

var chooseTime = function (req, res) {
    data.join.find(function (i, index) {
        if (i.eventID == req.query.id && req.accID == i.userID) {
            console.log(req.query.choose_time);
            for (let i in req.query.choose_time) {
                data.join[index]['choose-time'][i] = (req.query.choose_time[i] == "true");
            }
            return true;
        }
        return false;
    });
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    res.send({ msg: "Choose time for event" });
}

var viewEvent = function(req, res) {
    var username;
    data.user_info.find(function (value) {
        if (value.ID == req.accID) {
            username = value.name;
        }
    })
    let event = data.event.find(function (i) {
        return i.ID == req.query.id;
    });
    let log = data.join.filter(function (i) {
        return event.ID == i.eventID;
    });
    let attendees = [];
    var numberVote = [];
    for (let i = 0; i < event['recommended-time'].length; i++) {
        numberVote.push(0);
    }
    // Get attendees
    for (let i = 0; i < log.length; ++i) {
        let att = data.user_info.find(function (value) {
            return value.ID == log[i].userID;
        })
        att.attended = log[i].attended;
        let user = data.user.find(function (value) {
            return value.ID == log[i].userID;
        })
        if (user.role == 'user') attendees.push(att);
        log[i]['choose-time'].forEach(function (choose, index) {
            numberVote[index] += choose;
        })
    };
    console.log(numberVote)
    res.render(`${req.role}/event`, {
        title: 'event',
        event: event,
        role: req.role,
        attendees: attendees,
        numberVote: numberVote,
        username: username
    });
}

var viewCalendarEvent = function (req, res) {
    let user_info = data.user_info.find(function (value) {
        return req.accID == value.ID;
    });
    var log = data.join.filter(function (value) {
        return user_info.ID == value.userID;
    });
    var event = [];
    for (let i = 0; i < log.length; ++i) {
        let temp = data.event.find(function (val) {
            return log[i].eventID == val.ID;
        });
        event.push(JSON.parse(JSON.stringify(temp)));
    }
    for (let i of event) {
        let date = new Date(i['start-time']);
        i['start-time'] = date.toLocaleDateString();
    }
    res.render(`${req.role}/home`, {
        title: 'Home',
        user: user_info,
        event: event
    });
}

var viewListEvent = function (req, res) {
    let user_info = data.user_info.find(function (value) {
        return req.accID == value.ID;
    });
    var log = data.join.filter(function (value) {
        return user_info.ID == value.userID;
    });
    var event = [];
    for (let i = 0; i < log.length; ++i) {
        let temp = data.event.find(function (val) {
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

var createEventForm = function (req, res) {
    var user = data.user_info.find(function (value) {
        return value.ID == req.accID;
    });
    res.render(`${req.role}/new-event`, {
        user: user,
        title: 'New Event'
    });
}

var counting = function (req, res) {
    var d = JSON.parse(req.body.data);
    d.counting.forEach(function (value, index) {
        data.join.find(function (v) {
            if (d.ID == v.eventID && value.ID == v.userID) {
                v.attended = value.attended;
                return true;
            }
            return false;
        })
    })
    fs.writeFileSync('./mockdb/join.json', JSON.stringify(data.join));
    res.send({ msg: "ADASD" });
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
    counting
};