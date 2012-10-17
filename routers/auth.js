exports.register = function(req, res){    
    var email = req.body.email;
    var password = req.body.password;
    var confirmationpassword = req.body.confirmationpassword;
    var stayonline = req.body.stayonline;
    //Проверяем введенные данные
    var check = require('validator').check;
    if (!check(email).len(6, 64).isEmail() ||
        !check(password).notNull() ||
        !check(password).equals(confirmationpassword)){
        res.send({
            error: true,
            msg: 'Check your'
        });
        return;
    }
   //Регистрируем нового пользователя
    global.controllers.users.register(email, password, function(error, user, msg){
        if (error){
            if (typeof msg == 'undefined' || msg===null ) msg = 'Register error'; 
            res.send({
                error: true,
                msg: msg
            });    
            return;
        }
        //Сразу авторизовываемся
        req.session.authorized = true;
        req.session.user_id = user._id;
        req.session.username = user.email;  
        //Если стоит галочка "Запомнить меня" то записываем сессию и передаем ее номер
        if (stayonline){
            global.controllers.stayonlinesessions.savesession(user._id, function(error, hash){
                res.send({
                    error: false,
                    msg: 'Success register email: '+email,
                    sessionid: hash
                });    
            });
        }else{
            res.send({
                error: false,
                msg: 'Success register email: '+email
            });   
        }
    });   
};

exports.login = function(req, res){
    var email = req.body.email;
    var password = req.body.password;  
    var stayonline = req.body.stayonline;
    global.controllers.users.checkuser(email, password, function(error, canlogin, user){
        if (error || !canlogin){
            res.send({
                error: true,
                msg: 'Check your email or password'
            });
            return;    
        }
        req.session.authorized = true;
        req.session.user_id = user._id;
        req.session.username = user.email;        
        if (stayonline){
            global.controllers.stayonlinesessions.savesession(user._id, function(error, hash){
                res.send({
                    error: false,
                    msg: 'Success login email: '+user.email,
                    sessionid: hash
                });    
            });
        } else {
            
            res.send({
                error: false,
                msg: 'Success login email: '+user.email
            });
        }
    });
};

exports.logout = function(req, res){
    if (!req.session.authorized){
        res.send({
            error: true,
            msg: 'You are not loggined'
        });
        return;      
    }
    req.session.authorized = false;
    delete req.session.username;
    delete req.session.user_id;
    //Если номер сессии указан в куках, то удаляем его
    if (typeof req.cookies.sessionid !== 'undefined' && req.cookies.sessionid !== ''){
        global.controllers.stayonlinesessions.delsession(req.cookies.sessionid, function(error){
            if (error){
                console.log('Session was not deleted');    
                return;
            }            
        });   
    }
    res.send({
        error: false
    });
};

exports.getlogin = function(req, res){
    if (!req.session.authorized){
        //Если пользователь не авторизирован, то проверяем нет ли данных о сохраненных сессиях
        global.controllers.stayonlinesessions.getsession(req.cookies.sessionid, function(error, user){
            if (error){
                res.send({
                    error: true,
                    msg: 'You are not loggined'
                });
                return;
            }
            req.session.authorized = true;
            req.session.user_id = user._id;
            req.session.username = user.email;
            res.send({
                error: false,
                displayname: req.session.username
            });
        });            
    }else{
        res.send({
            error: false,
            displayname: req.session.username
        });
    }
};