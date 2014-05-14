/**
 * Routing information
 */
module.exports = function(app, passport){
  
    //==========================================
    //HOME PAGE
    //==========================================
    //Shows index page
    app.get('/', function(req, res){
        res.render('index.ejs');
    });
    
    //==========================================
    //LOGIN PAGE
    //==========================================
    //Shows login page
    app.get('/login', function(req, res){
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });


    app.post('/login', passport.authenticate('app-login', {
        successRedirect: '/profile',
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
    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs', {
            user: req.user
        });
    });
};

/**
 * Helper function to detect if user is authenticated
 */
function isLoggedIn(req, res, next){

    if (req.isAuthenticated())
        return next();
  
    res.redirect('/');
}