var xml = require('xmlbuilder');
var fs = require('fs');

/**
 * Function is used to create plis file which is required for downloading ios app.
 * @param  {string}   name     app name
 * @param  {string}   path     path to application
 * @param  {string}   title    title for alert
 * @param  {Function} callback function which will be called when plist file is created
 */
function creatPlist(name, path, title, callback){
	//var doc = builder.create();

	var d = xml.create('plist', {'version':'1.0'})
		.ele('dict')
			.ele('key','items').up()
			.ele('array')
				.ele('dict')
					.ele('key','assets').up()
					.ele('array')
						.ele('dict')
							.ele('key','kind').up()
							.ele('string','software-package').up()
							.ele('key','url').up()
							.ele('string',path).up()
						.up()
					.up()
					.ele('key','metadata').up()
					.ele('dict')
						.ele('key','bundle-identifier').up()
						.ele('string', name).up()
						.ele('key', 'kind').up()
						.ele('string','software').up()
						.ele('key','title').up()
						.ele('string', title)
						.up()
					.up()
				.up()
			.up()
		.up()
	.end({ pretty: true});

	//generate unique file path:) use this for now.
	var filePath = './processing/file.plist';

	fs.writeFile(filePath, d, function(err){
		callback(err,filePath);
	});


	console.log(xml);
}


//--------------EXPORTS---------------//
exports.creatPlist = creatPlist;

