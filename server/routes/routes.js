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
  	res.render('login.ejs');
  });

  //==========================================
  //LOGOUT 
  //==========================================
  //Processes logout message
  app.get('/logout', function(req,res){
  	res.logout();
  	res.redirect('/');
  });
  
  //==========================================
  //LOGOUT 
  //==========================================
  //Pуrocesses logout message
  app.get('/profile', isLoggedIn, function(req,res){
  	res.logout();
  	res.redirect('profile.ejs');
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