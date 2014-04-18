var fs = require('fs')
    ,util = require('util')
    ,ios_parser = require('./ipa_parser').IpaParser
    ,apk_parser = require('./apk_parser').ApkParser
    ,io = require('./../utils/utils.io.js').IOUtils
    ,appModel = require('./../models/mobile_app').AppModel;



/**
 * FileInfoCollector constructor
 * @param {string} path - parameter which shows path to the file which should be parsed
 */
var FileInfoCollector = function(path){
	this.filename = path;
};

/**
 * Target filename 
 * @type {String}
 */
FileInfoCollector.prototype.filename = '';


FileInfoCollector.prototype.parseFile = function() {

  var getFileType = function(filename){
    var filePath = filename;

    //check if file exist
    if (!fs.existsSync(filePath)){
      util.log('file not exist:' + filePath + ' .finishing operation');
      return;
    }

    //get file extension
    var fileExtension = filename.substring(filename.lastIndexOf('.') + 1);

    switch(fileExtension){
    case 'ipa':
      util.log('Apple file type detected');
      return 'ios';
    case 'apk':
      util.log('Android file type detected');
      return 'android';
    default:
      util.log('Unknown file type');
      return '';
    }
  };

  //function for saving information about file to the db
  var saveFileInfo = function(fileInfo){
    

    appModel.title = fileInfo.title;
    appModel.type = fileInfo.type;
    appModel.version = fileInfo.version;
    appModel.filename = fileInfo.filename;

    appModel.save(function(err,application){
      if (err) return console.log(err);
    });
  };

	//get type of the file
	var fileType = getFileType(this.filename);
  var current_file = this.filename;

  switch(fileType){
    case 'ios':
      
      ios_parser.parseFile(this.filename, function(err,res){
        
        if (err) return util.log(err);

        var app = parseIpaFileInformation(res);

        var destination = generateFileName(app);

        io.generateFileName(destination, function(filename){
          io.copyFile(current_file, filename, function(){
            app.filename = filename;

            console.log(app);

            fs.unlink(current_file);
          });
        });

        console.log(res);
      });
      return;

    case 'android':
      apk_parser.parseFile(this.filename, function(err,res){
        if (err) return util.log(err);
        
        console.log(res);
      });
      return;
  }
};

/**
 * helper function used to build object with info about
 * @param  {Array} data  array with information received from ipa_parser
 * @return {Object}      Application model, used by mongoose
 */
function parseIpaFileInformation(data){
  var fileObject = data[0];

  var application = new appModel({
    title: fileObject['CFBundleIdentifier'],
    type: 'ios',
    version: fileObject['CFBundleVersion'],
    filename: ''
  });

  return application;
}

/**
 * just utility function for generating name of the file using info about parsed applications
 * @param  {Object} app object with information about application
 * @return {string}     path to file of the application in builds folder
 */
function generateFileName(app){
  var file_extension = '';
  var date = new Date();

  if (app.type == 'ios'){
    file_extension = '.ipa';
  } else {
    file_extension = '.apk';
  }

  //generating file name
  var destination = './builds/' + app.title + '/' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '/' +
      app.type + '/' + app.title + file_extension;

  return destination;
}

//-------------EXPORTS----------------//
module.exports.FileInfoCollector = FileInfoCollector;


