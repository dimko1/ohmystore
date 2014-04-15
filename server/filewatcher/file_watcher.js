//current module is used to monitor if new file added to the folder
var chokidar = require('chokidar')
	,fs = require('fs')
	,path = require('path')
	,util = require('util')
	,fileinfo_controller = require('./../fileinfocollector/fileinfo_collector').FileInfoCollector
  ,io = require('./../utils/utils.io.js').IOUtils;


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

      var from = filepath;
      //create new path to file
      var to = './processing/' + path.basename(filepath);

      //copy file for processing
      io.copyFile(from, to, function(ex){

        if (ex){
          console.log('file copy failed:' + ex);
          return;
        }

        fs.unwatchFile(filepath);

        io.deleteFile(from);
        onFileUploadCompleted(to);
        observed_file = '';
        console.log('completed');
      });
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

function onFileUploadCompleted(path){
  //add event called even if file removed :(
  if (!fs.existsSync(path)){
    util.log('File not exist. probably delete operation');
    return;
  }

  //start file collection engine
  var fi = new fileinfo_controller(path);
  fi.parseFile();
}
