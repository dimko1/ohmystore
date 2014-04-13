var config = require('./server/config/env/development');
var mongoose = require('mongoose');

//db connection
var db = mongoose.connect(config.db);

//starting express
var express_app = require('./server/config/express_bootstrap');
express_app.start(config);

var file_watcher = require('./server/filewatcher/file_watcher');

console.log(config.db);