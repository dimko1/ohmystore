var profile_controller = {};


var change_password = function(req,res){
	var old_password = req.body.old_password;
	var new_password = req.body.new_password;

	console.log(old_password + " " + new_password);
}

module.exports = {
	change_password:change_password
}