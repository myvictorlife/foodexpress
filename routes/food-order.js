'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var FoodOrderControllerController = require('../controllers/food-order');

module.exports = [{
        method: 'POST',
        path: '/food-order',
        config: {
            description: 'Inserindo pedido do usuário na base',
            auth: 'token',
            handler: FoodOrderControllerController.insert
        }
    },{
        method: 'GET',
        path: '/food-order/{id}',
        config:{
          description: 'Buscando pedido do usuário na base por id',
          auth: 'token'
        },
        handler: FoodOrderControllerController.findByUserId
    },{
        method: 'PUT',
        path: '/food-order',
        config: {
            description: 'Editando pedido do usuário na base',
            auth: 'token'
            },
            handler: FoodOrderControllerController.update
    },{
        method: 'GET',
        path: '/food-order-company/{id}',
        config: {
            description: 'Buscando pedido da empesa na base por id',
            //auth: 'token'
        },
        handler: FoodOrderControllerController.findByCompanyId
    }
];
    