/**
 * {host:string, post:int, username:string, password:string, auto_reconnect:int, db:*}, callback:Function(err, db)
 **/
exports.opendb = function(settings, callback){    
    var mongo = require('mongodb');
    var Server = mongo.Server;
    var Db = mongo.Db;
    
    var server = new Server(settings.host, settings.port, {auto_reconnect: settings.auto_reconnect});
    var db = new Db(settings.db, server);
    
    db.open(function(err, db) {
      if(err) callback(true, db);
      else db.authenticate(settings.username, settings.password, function(){
          callback(false, db);
      });
    });    
};

exports.criptpassword = function(string){
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string+global.saldo).digest("hex");
};