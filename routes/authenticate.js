'use strict';

var authenticateController = require('../controllers/authenticate');
const serverEndpoints = require('../config/server-endpoints')
const Joi = require('joi');

module.exports = [{
          method: 'POST',
          path: '/authenticate',
          config: {
            description: 'Autentica um usuário na base',
            validate: {
                  payload: { email: Joi.string().required(),
                             password: Joi.string().required() 
                            }
              },
            handler: authenticateController.authenticate
          }
      }];