exports.register = function(email, password, callback){
    global.db.collection('users', function(err, collection) {
        if (err){
            callback(true);
            return;
        }
        collection.findOne({email: email.toLowerCase()}, function(eror, item){
            if (item === null){
                collection.insert({email: email.toLowerCase(), password: global.controllers.db.criptpassword(password), emailchack: true, roles: []},{safe:true},function(error, result){
                    if (err){
                        callback(true);
                        return;
                    }   
                    callback(false, result[0]);
                });
            }else  callback(true, null, 'User already exists');    
            
        });
    });     
};

exports.getuser = function(id, callback){
    global.db.collection('users', function(err, collection) {
        if (err){
            callback(true);
            return;
        }
        var ObjectID = require('mongodb').ObjectID;
        if (typeof id === 'string') id = new ObjectID(id);
        collection.findOne({_id: id}, function(eror, item){
            if (err){
                callback(true);
                return;
            }    
            callback(false, item);
        });
    });
};

exports.checkuser = function(email, password, callback){

    global.db.collection('users', function(err, collection) {
        if (err){
            callback(true);
            return;
        }
        collection.findOne({email: email.toLowerCase(), password: global.controllers.db.criptpassword(password)}, function(error,item){
            if (item === null) item = {};
            callback(error, item.emailchack, item);    
        });
    });    
};