exports.savesession = function(user_id, callback){

    global.db.collection('stayonlinesessions', function(err, collection) {
        if (err){
            callback(true);
            return;
        }
        var hash = global.controllers.db.criptpassword(user_id.toString());
        collection.insert({user_id: user_id, hash: hash, createdate: new Date()},{safe:true},function(error, result){
            if (err){
                callback(true);
                return;
            }   
            callback(false, hash);
        });
    });    
};

exports.getsession = function(hash, callback){
    global.db.collection('stayonlinesessions', function(err, collection) {
        if (err){
            callback(true);
            return;
        }
        collection.findOne({hash: hash}, function(error,item){
            if (err || item === null){
                callback(true);
                return;
            }   
            global.controllers.users.getuser(item.user_id, function(error, user){
                if (err || user === null){
                    callback(true);
                    return;
                }
                callback(false, user);
            });
        });        
    });   
};

exports.delsession = function(hash, callback){
    global.db.collection('stayonlinesessions', function(err, collection) {
        if (err){
            callback(true);
            return;
        }        
        collection.remove({hash: hash}, {safe: true}, function(err,removed){
            if (err || !removed){
                callback(true);
                return;
            }   
            callback(false);
        });        
    }); 
};