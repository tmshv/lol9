exports.index = function(req, res){
    res.render('index', {title: 'Home'});   
};
exports.auth = require('./auth');