var user = require('./../models/model_user').User;

var boostrap = function(){

};

boostrap.prototype.performStartCheck = function(){
    createAdminAccount();
};

function createAdminAccount(){
    user.findOne({'local.name' : 'admin'}, function(err,adminObject){
    //probably admin account is not exist
        if (!err && !adminObject){
            var admin = new user({
                local:{
                    email:'admin@admin.com',
                    password:'admin',
                    name:'admin'
                }
            });

            admin.save( function(err, admin){
                if (err)
                    return console.log(err);
            });
        }
    });
}

module.exports.Bootstrap = new boostrap();

