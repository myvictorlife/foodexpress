'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var companyController = require('../controllers/company');

const serverEndpoints = require('../config/server-endpoints')

module.exports = [{
        method: 'POST',
        path: '/company',
        config: {
            description: 'Inserindo empresa na base',
            auth: 'token',
            handler: companyController.insert
        }
    },{
        method: 'GET',
        path: '/company/{id}',
        config:{
          description: 'Buscando empresa na base por id',
          auth: 'token'
        },
        handler: companyController.findByID
    },{
        method: 'GET',
        path: '/company',
        config:{
          description: 'Buscando todas as empresas com endereço relacionado na base',
          auth: 'token'
        },
        handler: companyController.find
    },{
        method: 'PUT',
        path: '/company',
        config: {
            description: 'Editando usuário na base',
            auth: 'token'
            },
            handler: companyController.update
}];
    