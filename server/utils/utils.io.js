var fs = require('fs')
    ,util = require('util')
    ,mkdirp = require('mkdirp')
    ,path = require('path');

/**
 * Input / Output helper object.
 * Contains usefull function for working with file system
 */
var IOUtils = function(){};
  /**
   * simple copy file function
   * @param  {String}   from     file source path
   * @param  {String}   to       file destination path
   * @param  {Function} callback function which will be called once file copy completed

   */
  IOUtils.prototype.copyFile = function(from, to, callback) {
    if (!fs.existsSync(from)){
      util.log('file not exist. probably delete operation');
      return;
    }

    var folder = path.dirname(to);

    console.log(folder);

    var copy = function(){
      var rd = fs.createReadStream(from);

      var ws = fs.createWriteStream(to)
        .on('close', function(ex){
          callback(ex);
        });
      rd.pipe(ws);
    };

    //create folder tree
    this.createFolder(folder, copy);
  };

  /**
  * function used to check and remove file
  * @param  {String} target destination to file which should be removed
  */
  IOUtils.prototype.deleteFile = function(target) {
    if (!fs.existsSync(target)){
      return util.log('file not exist. probably delete operation');
    }
    fs.unlink(target);
  };

  /**
   * creating of the folders tree. e.g. creating folder tree /process/foo/bar/zaz in folder /process
   * @param  {String}   folder   folder tree to creates
   * @param  {Function} callback function which will be called when folder tree creation completed
   */
  IOUtils.prototype.createFolder = function(folder, callback){

    //check if folder exist
    if (!fs.existsSync(folder)){
      //call mkdirp to create required folders
      mkdirp(folder, function(err){
        if (err){
          console.error(err);
          callback(err);
          return;
        }
        callback();
      });
      return;
    }

    callback();
  };

  /**
  * generating of the unique filenam for storing application name
  * @param  {String}   filename basic file name
  * @param  {Function} callback function which will be called when filename will be generated
  */
  IOUtils.prototype.generateFileName = function(filename, callback){
    var folderName = path.dirname(filename);
 
    var generateFileName = function(){
     
      var filePath = filename.substring(0, filename.lastIndexOf('.'));
  
      var fileExtension = filename.substring(filename.lastIndexOf('.') + 1);
      var generatedName = filePath + '.' + fileExtension;
  
      console.log(generatedName);
  
      var fileIndex = 1;
      while(true){
        if (fs.existsSync(generatedName)){
          generatedName = filePath + fileIndex + '.' + fileExtension;
          fileIndex++;
        } else {
          break;
        }
      }
 
      callback(generatedName);
    };

    this.createFolder(folderName, generateFileName);
  };

//---------------EXPORTS----------------//
module.exports.IOUtils = new IOUtils();