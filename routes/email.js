'use strict';

var emailController = require('../controllers/email');
const Joi = require('joi');

module.exports = [{
          method: 'GET',
          path: '/forgot/{email}',
          config: {
            description: 'Enviar email para o usuário',
            handler: emailController.sendEmail
          }
      }];