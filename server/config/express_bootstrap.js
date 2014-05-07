var express		= require('express');
var http 		= require('http');
var https		= require('https');
var fs 			= require('fs');
var path		= require('path');
var util 		= require('util');
var passport    = require('passport');
var flash       = require('connect-flash');

/**
 * used to start express application 
 */
function start(config){
	
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 8080);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.session({secret: 'thesecretphrase_wiskey'}));
	
	app.use(passport.initialize());
	app.use(passport.session);

	app.use(flash());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	
	require('./../routes/routes.js')(app, passport);

	//SSL required to deploy application for iOS starting 7.1
	//can be self signed during development
	//for enterprise deployment + deployment outside company should be correct SSL cert
	/*
	var ssl_options = {
	  key: fs.readFileSync('./SSL/mycert.key'),
	  cert: fs.readFileSync('./SSL/mecert.cer')
	//  ca: fs.readFileSync('./SSL/myCA.pem')
	};

	https.createServer(options, app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	}); */
	


	http.createServer(app).listen(config.port);

	util.log('Server started on ' + config.port);
}

//--------------EXPORTS-------------//
exports.start = start;