var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

/**
 * SCHEMA
 */
var ApplicationSchema = new Schema({
    title: {type: String, default: '', trim: true},
    type: {type: String, default: '', trim: true},
    version: {type: String, default: '0.0.0.1'},
    filename: {type: String, default: ''}
  });


/**
 * Validations
 */
ApplicationSchema.path('title').required(true, 'Application Title can not be empty');

/**
 * Validations
 */
ApplicationSchema.path('type').required(true, 'Application Type can not be empty');

/**
 * Validations
 */
ApplicationSchema.path('filename').required(true, 'Application Filename can not be empty');


/**
 * Mapping model to the schema
 */
var appModel = mongoose.model('Application', ApplicationSchema);

/**
 * Exports
 */
module.exports.AppModel = appModel;