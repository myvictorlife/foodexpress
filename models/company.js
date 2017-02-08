// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// create a schema
var companySchema = new Schema({
  img: String,
  name: String,
  type: String,
  open: Boolean,
  latitude: Number,
  longitude: Number,
  created_at:  { type: Date, default: Date.now },
  updated_at: Date
});

var Company = mongoose.model('Company', companySchema);
module.exports = Company;
