'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var AdditionalInformationController = require('../controllers/additional-information-company');

const serverEndpoints = require('../config/server-endpoints')

module.exports = [{
        method: 'POST',
        path: '/additionalInformationCompany',
        config: {
            description: 'Inserindo informações adicionais da empresa na base',
            auth: 'token',
            handler: AdditionalInformationController.insert
        }
    },{
        method: 'GET',
        path: '/additionalInformationCompany/{id}',
        config:{
          description: 'Buscando informações adicionais da empresa na base por id',
          auth: 'token'
        },
        handler: AdditionalInformationController.findByID
    },{
        method: 'PUT',
        path: '/additionalInformationCompany',
        config: {
            description: 'Editando informações adicionais da empresa na base',
            auth: 'token'
            },
            handler: AdditionalInformationController.update
}];
    