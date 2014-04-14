/**
 * Constructor
 * @param {[string]} path to file 
 */
var ApkParser = function(){
};

/**
 * function used to parse Manifest information from the apk file
 * @param  {string} filepath	path to file for parsing
 * @return {function} callback	funtcion which will be called after parsing complets
 */
ApkParser.prototype.parseFile = function(filepath, callback) {
	console.log('Parse apk file called');
};

module.exports.ApkParser = new ApkParser();