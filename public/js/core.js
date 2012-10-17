function Init(){
  /*                            LOGIN WINDOW                    */
  //Init vars
  var user = jQuery('#user');
  var loginwindow = jQuery('#login');
  var loginemail = jQuery('#email');
  var loginpassword = jQuery('#password');
  var confirmationpassword = jQuery('#confirmationpassword');
  var pagelogin = jQuery('#pagelogin');
  var pageregister = jQuery('#pageregister');
  var confirmationpassworddiv = jQuery('#confirmationpassworddiv');
  var loginmsg = jQuery(jQuery('.msg',loginwindow)[0]);
  var stayonline = jQuery('#stayonline');
  confirmationpassworddiv.hide();
  loginmsg.hide();
  //Set events
  confirmationpassword.keypress(inputkeypress);
  loginpassword.keypress(inputkeypress);
  loginemail.keypress(inputkeypress);
  user.click(function(){    
    loginwindow.fadeIn('fast');
  });
  jQuery('#logincancel').click(function(){
    hidewindow();  
  });
  jQuery('#loginsbmt').click(function(){      
      var isLogin = pagelogin.hasClass('active');
      var error = false;
      var errormsg = '';
      if (loginemail.val()===''){
          error = true;
          loginemail.addClass('error');
          errormsg += 'Type your email';
      }else loginemail.removeClass('error'); 
      if (!isLogin){
        if (loginpassword.val()===''){
          error = true;
          loginpassword.addClass('error');
          errormsg += '<br/>Type your password';
        }else loginpassword.removeClass('error');  
        if (confirmationpassword.val()===''){
          error = true;
          confirmationpassword.addClass('error');
          errormsg += '<br/>Type your confirmation password';
        }else confirmationpassword.removeClass('error');  
        if (confirmationpassword.val()!=loginpassword.val()){
            error = true;    
            confirmationpassword.addClass('error');
            errormsg += '<br/>Password not same';
        }
      }
      if (!error) {        
        if (!isLogin)
            registeruser();    
        else
            loginuser();
      }else{
        loginmsg.html(errormsg);
        loginmsg.show();
      }
  });
  jQuery('.back',loginwindow).click(function(){
    hidewindow();  
  });
  pagelogin.click(function(){
    pagelogin.addClass('active');
    pageregister.removeClass('active');
    confirmationpassworddiv.hide();  
    loginmsg.hide();
    jQuery('#loginsbmt').html('login');
  });
  pageregister.click(function(){
    pagelogin.removeClass('active');
    pageregister.addClass('active');
    confirmationpassworddiv.show();  
    loginmsg.hide();
    jQuery('#loginsbmt').html('register');
  });
  //Check login state
  checklogin();
  //Other function
  function inputkeypress(){
    if (jQuery(this).val()!=='')
        jQuery(this).removeClass('error');
  }
  //Hide login window and clear state
  function hidewindow(){    
    loginwindow.fadeOut('fast',function(){
        loginmsg.hide();
        confirmationpassword.removeClass('error');
        loginpassword.removeClass('error'); 
        loginemail.removeClass('error'); 
        pagelogin.click();
    });  
  }
  //Do login
  function loginuser(){    
    jQuery.ajax({
      type: "POST",
      url: "/auth",
      data: { email: loginemail.val(), password: loginpassword.val(), stayonline: stayonline.val()==='1'}
    }).done(function( msg ) {
      loginpassword.val('');
      if (msg.error){
        loginmsg.html(msg.msg);
        loginmsg.show();  
      }else{          
        jQuery.cookie('sessionid',msg.sessionid);
        loginmsg.html(msg.msg);
        loginmsg.show();  
        setTimeout(function() {
            hidewindow();
            checklogin();
        }, 1000);
      }
    });  
  }
  //Check login state
  function checklogin(){
    user.html('loading...');
    jQuery.ajax({
      type: "GET",
      url: "/auth"
    }).done(function( msg ) {
        if (msg.error) {
            user.html('login');
            user.unbind('click');
            user.click(function(){loginwindow.fadeIn('fast');});
        } else {
            user.html(msg.displayname);
            user.unbind('click');
            user.click(logout);
        }
            
    });   
  }
  //Do log out
  function logout(){
    jQuery.ajax({
      type: "DELETE",
      url: "/auth"
    }).done(function(msg){
        if (msg.error){
            alert(msg.msg);
            return;
        }
        user.html('login');
        user.unbind('click');
        user.click(function(){    
            loginwindow.fadeIn('fast');
        });
    });  
  }
  //Register new user
  function registeruser(){
   
    jQuery.ajax({
      type: "POST",
      url: "/auth/register",
      data: { email: loginemail.val(), password: loginpassword.val(), confirmationpassword:  confirmationpassword.val(), stayonline: stayonline.val()==='1'}
    }).done(function( msg ) {
      loginpassword.val('');
      confirmationpassword.val('');        
      if (msg.error){
        loginmsg.html(msg.msg);
        loginmsg.show();  
      }else{
        loginmsg.html(msg.msg);
        loginmsg.show();  
        setTimeout(function() {
            hidewindow();
            checklogin();
        }, 1000);
      }
    });
  }
  /*                            LOGIN WINDOW                    */
};