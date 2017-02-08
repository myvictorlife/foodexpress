// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// create a schema
var additionalInformationCompanySchema = new Schema({
  foodOrder: [{
        type: String,
        order: [{
            name: { type: String, required: true },
            ingredients: { type: String, required: true },
            price: { type: String, required: true },
            types: [ { type: String} ]
        }]
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
    dayOfWeek: [{
        day: { type: String, required: true },
        timeOpen: { type: String, required: true },
        timeClose: { type: String, required: true }
    }],
    payment: [{
        img: String,
        card: String
    }],
    aboutUs: String
});

var additionalInformationCompany = mongoose.model('AdditionalInformationCompany', additionalInformationCompanySchema);
module.exports = additionalInformationCompany;