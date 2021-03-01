var userAccess = function(req, res, url) {
    switch(url) {
        case 'profile':
            res.render('user/profile', {title: 'Profile'});
            break;
        case 'lists':
            res.render('user/lists', { title: 'To-do List' });
            break;
        case 'home':
            res.render('user/home', {title: 'Home'});
            break;
        case '':
            res.render('user/home', {title: 'Home'});
            break;
        default:
            break;
    }
}
    
var adminAccess = function(req, res, url) {
    //To do
}

module.exports = {
    userAccess: userAccess,
    adminAccess: adminAccess
}