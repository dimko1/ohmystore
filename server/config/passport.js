var localStrategy = require('passport-local').Strategy
    ,user = require('./../models/model_user').User;


module.exports = function(passport){

  //========PASSPORT CONFIGURATION========//
  
  /**
   * helper function to serialize user. quite simple now
   */
  passport.serializer(function(user, callback){
    callback(null, user.id);
  });

  /**
   * get user by id
   */
  passport.deserializeUser(function(id,callback){
    user.findById(id, function(err, user){
      callback(err, user);
    });
  });


  passport.use('login', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
  },

  function(req, email, password, callback){
    user.findOne({'local.email' : email}, function(err,user){
      if (err)
        return callback(err);
      //validate if user exists
      if (!user)
        return callback(null, false, req.flash('loginMessage', 'No user found'));
      
      //check password
      if (!user.validPassword(password))
        return callback(null, false, req.flash('logineMessage', 'Incorrect password'));
    
      //success!
      return callback(null, user);
    });
  }));
};


