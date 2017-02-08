// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// create a schema
var foodOrderSchema = new Schema({
  userID: { type:Schema.ObjectId, ref:"User" },
  companyID: { type:Schema.ObjectId, ref:"Company" },
  order: [{
      name: { type: String, required: true },
      ingredients: { type: String, required: true },
      price: { type: String, required: true },
      types: { type: String },
      observacion: String,
      total: Number
  }],
  address: {
    street: String,
    number: String,
    neighborhood: String,
    complement: String,
    city: String,
    zip_code: Number,
    created_at:  { type: Date, default: Date.now },
    updated_at: Date
  },
  payment: {
      card: { type: String, required: true }
  },
  status: String,
  open: Boolean,
  created_at:  { type: Date, default: Date.now },
  updated_at: Date,
  totalPayment: String
});

var foodOrderSchema = mongoose.model('FoodOrder', foodOrderSchema);
module.exports = foodOrderSchema;