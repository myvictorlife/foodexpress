// grab the things we need
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
const crypt = require('../config/cryptography')
const Address = require('../models/address')
const serverEndpoints = require('../config/server-endpoints')

Mongoose.connect( serverEndpoints.URL_MONGO );

// create a schema
var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  created_at:  { type: Date, default: Date.now },
  updated_at: Date
});


userSchema.methods.encrypt = function() {
  this.password = crypt.encrypt(this.password); 
  return this.name;
}

var User = Mongoose.model('User', userSchema);
module.exports = User;