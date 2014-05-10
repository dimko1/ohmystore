var localStrategy = require('passport-local').Strategy
    ,user = require('./../models/model_user').User;

module.exports = function(passport){

    //========PASSPORT CONFIGURATION========//
  
    /**
     * helper function to serialize user. quite simple now
     */
    passport.serializeUser(function(user, callback){
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
  
    //usage of the local strategy
    passport.use('app-login', new localStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
    

    //check user
    function(req, name, password, callback){
        user.findOne({'local.name' : name}, function(err,user){
            if (err)
                return callback(err);
            
            //check password
            if (!user || !user.validPassword(password))
                return callback(null, false, req.flash('loginMessage', 'Incorrect username or password'));
      
            //success!
            return callback(null, user);
        });
    }));
};


