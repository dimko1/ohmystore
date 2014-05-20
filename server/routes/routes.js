var profile_controller = require('./../controllers/profile_controller');


/**
 * Routing information
 */
module.exports = function(app, passport){
  
    //==========================================
    //HOME PAGE
    //==========================================
    //Shows index page
    app.get('/', function(req, res){
        
        //redirect user if he is already authenticated
        if (req.isAuthenticated()){
            return res.redirect('/main');
        }

        res.render('index.ejs');
    });
    
    //==========================================
    //LOGIN PAGE
    //==========================================
    //Shows login page
    app.get('/login', function(req, res){
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    //==========================================
    //LOGIN PAGE
    //==========================================
    //Handles login method
    app.post('/login', passport.authenticate('app-login', {
        successRedirect: '/main',
        failureRedirect: '/login',
        failureFlash: true
    }));
  
    //==========================================
    //LOGOUT 
    //==========================================
    //Processes logout message
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
    
    //==========================================
    //PROFILE
    //==========================================
    //Process profile screen
    app.get('/main', isLoggedIn, function(req,res){
        res.render('main.ejs', {
            user: req.user,
            active: req.active
        });
    });

    //==========================================
    //TEAM
    //==========================================
    //Process teams screen
    app.get('/team', isLoggedIn, function(req,res){
        res.render('team.ejs', {
            user: req.user,
            active: req.active
        });
    }); 

    //==========================================
    //Profile
    //==========================================
    //Process profile screen
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs', {
            user: req.user,
            active: req.active,
            message: req.flash('loginMessage')
        });
    });

    //==========================================
    //Profile
    //==========================================
    //Process profile screen
    app.post('/update_profile', isLoggedIn, function(req,res){
        res.render('profile.ejs', {
            user: req.user,
            active: req.active
        });
    });

    //==========================================
    //Profile
    //==========================================
    //Process profile screen
    app.post('/change_password', isLoggedIn, profile_controller.change_password);      

};

/**
 * Helper function to detect if user is authenticated
 */
function isLoggedIn(req, res, next){

    if (req.isAuthenticated())
        return next();
  
    res.redirect('/');
}