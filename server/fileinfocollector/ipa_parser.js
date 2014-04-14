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
};

module.exports.IpaParser = new IpaParser();