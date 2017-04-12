'use strict';

var uploadController = require('../controllers/upload');

module.exports = [{
      method: 'POST',
      path: '/upload-file',
      config: {
        description: 'Enviar email para o usuário',
        handler: uploadController.upload
      }
  }];