// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// create a schema
var companyUserSchema = new Schema({
  companyID: { type:Schema.ObjectId, ref:"Company" },
  img: String,
  name: String,
  password: String,
  permission: String,
  created_at:  { type: Date, default: Date.now },
  updated_at: Date
});

var CompanyUser = mongoose.model('CompanyUser', companyUserSchema);
module.exports = CompanyUser;
