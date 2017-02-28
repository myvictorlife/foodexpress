'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var userController = require('../controllers/user');

const serverEndpoints = require('../config/server-endpoints')

const Joi = require('joi');
const crypt = require('../config/cryptography')

module.exports = [{
        method: 'POST',
        path: '/users',
        config: {
            description: 'Inserindo usuário na base',
            handler: userController.insert
        }
    },{
        method: 'POST',
        path: '/users/password',
        config: {
            description: 'Mudar a senha do usuário na base',
            handler: userController.changePassword
        }
    },{
        method: 'GET',
        path: '/users/{id}',
        config:{
          description: 'Buscando usuário na base por id',
          auth: 'token'
        },
        handler: userController.findByID
    },{
        method: 'GET',
        path: '/users/email/{email}',
        config:{
          description: 'Buscando usuário na base por email',
          auth: 'token'
        },
        handler: userController.findByEmail
    },{
        method: 'GET',
        path: '/users',
        config:{
          description: 'Buscando todos os usuário com endereço relacionado na base',
          auth: 'token'
        },
        handler: userController.find
    },{
        method: 'PUT',
        path: '/users',
        config: {
            description: 'Editando usuário na base',
            auth: 'token',
            validate: {
                payload: { name: Joi.string().required(),
                           phone: Joi.string().required(),
                           email: Joi.string().required()
                         }
            },
            handler: userController.update
        }
}];
