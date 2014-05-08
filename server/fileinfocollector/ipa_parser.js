var admzip = require('adm-zip')
   ,fs = require('fs')
   ,plist = require('bplist-parser');



/**
 * Constructor
 * @param {[string]} path to file 
 */
var IpaParser = function(){
};

/**
 * function used to parse Manifest information from the apk file
 * @param  {string} filepath	path to file for parsing
 * @return {function} callback	funtcion which will be called after parsing complets
 */
IpaParser.prototype.parseFile = function(filepath, callback) {
    console.log('Parse ipa file called');

    if (!fs.existsSync(filepath)){
        util.log('file not exist:' + filepath + '    .finishing operation');
        return;
    }

    //parse plist file
    var parse_plist = function(plistpath){
        plist.parseFile( plistpath, function(err, obj){
            callback(err, obj);
        });
    };

    var zip = new admzip(filepath);
    var zipEntrees = zip.getEntries();

    zipEntrees.forEach(function(zipEntree){
        //seraching for plist file
        if (zipEntree.entryName.indexOf('Info.plist') != -1){
            zip.extractEntryTo(zipEntree.entryName, './processing/extracts/', false, true);
            parse_plist('./processing/extracts/Info.plist');
        }
    });
};

module.exports.IpaParser = new IpaParser();