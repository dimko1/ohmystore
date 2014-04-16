var fs = require('fs');

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

	if (!fs.existsSync(filepath)){
		util.log('file not exist:' + filepath + '    .finishing operation');
		return;
	}

	var parseApk = require('ohmyapk');
	
	parseApk(filepath, function (err, data) {
		callback(err,data);
	});
};

module.exports.ApkParser = new ApkParser();