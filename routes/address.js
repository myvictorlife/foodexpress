'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var addressController = require('../controllers/address');

const Joi = require('joi');
const crypt = require('../config/cryptography')

module.exports = [{
        method: 'POST',
        path: '/address',
        config: {
            description: 'Inserindo endereço na base',
            handler: addressController.insert
        }
    },{
        method: 'GET',
        path: '/address/{id}',
        config:{
          description: 'Buscando todos os endereços do usuário na base por id',
          auth: 'token'
        },
        handler: addressController.findByID
    },{
        method: 'PUT',
        path: '/address',
        config: {
            description: 'Editando endereço na base',
            auth: 'token',
            validate: {
                payload: { 
                           id: Joi.string().required(),
                           userID: Joi.string().required(),
                           street: Joi.string().required(),
                           number: Joi.string().required(),
                           neighborhood: Joi.string().required(),
                           city: Joi.string().required(),
                           zip_code: Joi.number().required(),
                         }
            },
            handler: addressController.update
        }
}];
    