var data = require('../config/db.config');
var fs = require('fs');

var getInfo = function(req, res) { 
    let user = data.user_info.find(function(value){
        return req.accID == value['ID'];
    });
    console.log(user);
    res.render(`${req.role}/setting`, {
        title: 'Setting',
        user: user
    });
}

var changePassword = function(req, res) {
    let user = data.user.find(function(value) {
        return req.accID == value.ID;
    });
    if(user.password != req.body.old_pass)
        res.send({msg: 'Incorrect old password !'});
    else {
        user.password = req.body.new_pass;
        fs.writeFileSync('./mockdb/user.json', JSON.stringify(data.user));
        res.send({msg: "Change password successfully"});
    }
}

var createAccount = function(req, res) {

}

var updateInfo = function(req, res) {
    data.user_info.find(function(value, index) {
        if(req.accID == value.ID) {
            data.user_info[index]['phone-number'] = req.body.phoneNumber;
            data.user_info[index].email = req.body.email;
            data.user_info[index].birthday = req.body.birthday;
            data.user_info[index].github = req.body.github;
        }
        return req.accID == value.ID;
    });
    fs.writeFileSync('./mockdb/user_info.json', JSON.stringify(data.user_info));
    res.send({msg: 'Update successfully'})
}

var listAccounts = function(req, res) {
    
}

module.exports = {
    getInfo,
    updateInfo,
    changePassword,
    listAccounts
}