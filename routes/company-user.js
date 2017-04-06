'use strict';

var companyController = require('../controllers/company-user');

module.exports = [{
        method: 'POST',
        path: '/company-user',
        config: {
            description: 'Inserindo usuário da empresa na base',
            //auth: 'token',
            handler: companyController.insert
        }
    },{
        method: 'GET',
        path: '/company-user/{userId}/{companyId}',
        config:{
          description: 'Buscando usuário da empresa na base por id',
          //auth: 'token'
        },
        handler: companyController.findByID
    },{
        method: 'GET',
        path: '/company-user-all/{id}',
        config:{
          description: 'Buscando todos os usuários da empresa na base',
          //auth: 'token'
        },
        handler: companyController.find
    },{
        method: 'PUT',
        path: '/company-user',
        config: {
            description: 'Editando usuário da empresa base',
            //auth: 'token'
            },
            handler: companyController.update
    },{
        method: 'DELETE',
        path: '/company-user/{id}',
        config:{
          description: 'Deletar usuário da empresa na base por id',
          //auth: 'token'
        },
        handler: companyController.delete
    }
];