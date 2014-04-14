//current module is used to monitor if new file added to the folder
var chokidar = require('chokidar')
	,fs = require('fs')
	,path = require('path')
	,util = require('util')
	,fileinfo_controller = require('./../fileinfocollector/fileinfo_collector').FileInfoCollector;


//create watcher for temp folder
var watcher = chokidar.watch('./temp/', {ignored: /[\/\\]\./, persistent: true});
var observed_file = '';

watcher
  .on('add', function(filepath) {
    //for some reason on Windows PCs file added event occured ~ 6 times. We need to ignore other add events
    if (observed_file !== '') return;

    util.log('File:' + filepath + ' has been added');

    //current function will be called once file upload to the directory will be completed:
    //for example in cases when file is uploaded throgh networ
    var fileUploaded = function(){
      util.log('File upload completed.');
      var fi = new fileinfo_controller(filepath);
      fi.parseFile();
    };

    var timerHit = setTimeout(fileUploaded, 5000);
    observed_file = filepath;

    //watch changed for date modified attribute, to know when file upload will be completed.
    fs.watchFile(filepath, function (curr, prev) {

      clearTimeout(timerHit);
      console.log('the current mtime is: ' + curr.mtime);
      console.log('the previous mtime was: ' + prev.mtime);
      //restart timer
      timerHit = setTimeout(fileUploaded, 5000);
    });
});

