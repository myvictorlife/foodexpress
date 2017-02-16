'use strict';

var relationshipController = require('../controllers/relationship');
const serverEndpoints = require('../config/server-endpoints')
const Joi = require('joi');

module.exports = [{
      method: 'POST',
      path: '/relationship/favorite',
      config:{
          description: 'Adiciona ou Remove Autentica um usuário na base',
          auth: 'token'
        },
        handler: relationshipController.favorite
  }];