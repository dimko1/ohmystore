var mongoose = require('mongoose')
    ,bcrypt = require('bcrypt-nodejs');
    
var Schema = mongoose.Schema;

//user model for authentication
var userSchema = Schema({
	local:{
		email: String,
		password: String,
		name: String
	}
});

/**
 * Helper function used to generate hash for the password
 * @param  {string} password 
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * check if password is valid
 * @param  {string} password password to validate
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


/**
 * Mapping model to the schema
 */
var userModel = mongoose.model('User', userSchema);

/**
 * Exports
 */
module.exports.User = userModel;