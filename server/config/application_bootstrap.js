var user = require('./../models/model_user').User;

var boostrap = function(){

};

/**
 * perform initialization steps
 * @return {[type]} [description]
 */
boostrap.prototype.performStartCheck = function(){
    createAdminAccount();
};

/**
 * Helper function used to check if admin account is created
 * If account is not created - create one
 * @return {[type]} [description]
 */
function createAdminAccount(){
    user.findOne({'local.name' : 'admin'}, function(err,adminObject){
    //probably admin account is not exist
        if (!err && !adminObject){
            var admin = new user({
                local:{
                    email:'admin@admin.com',
                    name:'admin'
                }
            });
            
            //generating password for admin
            admin.local.password = admin.generateHash('admin');

            admin.save( function(err, admin){
                if (err)
                    return console.log(err);
            });
        }
    });
}

//--------------EXPORTS-------------//
module.exports.Bootstrap = new boostrap();

