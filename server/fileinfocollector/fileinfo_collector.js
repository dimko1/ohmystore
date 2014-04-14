var fs = require('fs')
    ,util = require('util')
    ,ios_parser = require('./ipa_parser').IpaParser
    ,apk_parser = require('./apk_parser').ApkParser;



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

	//get type of the file
	var fileType = getFileType(this.filename);

    switch(fileType){
      case 'ios':
        ios_parser.parseFile(this.filename, function(err,res){
        });
        return;
      case 'android':
        apk_parser.parseFile(this.filename, function(err,res){
        });
        return;
    }
};

//-------------EXPORTS----------------//
module.exports.FileInfoCollector = FileInfoCollector;


