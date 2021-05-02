var data = require('../config/db.config');

var getInfo = function(req, res) { 
    let user = data.user.find(function(value){
        return req.accID == value['ID'];
    });
    res.render(`${req.role}/setting`, {
        title: 'Setting',
        user: user
    });
}

var updateInfo = function(req, res, next) {

}

module.exports = {
    getInfo,
    updateInfo
}