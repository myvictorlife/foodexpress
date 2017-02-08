// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var relationship = require("mongoose-relationship")

// create a schema
var addressSchema = new Schema({
  userID: { type:Schema.ObjectId, ref:"User" },
  street: String,
  number: String,
  neighborhood: String,
  city: String,
  zip_code: Number,
  created_at:  { type: Date, default: Date.now },
  updated_at: Date
});

var Address = mongoose.model('Address', addressSchema);
module.exports = Address;