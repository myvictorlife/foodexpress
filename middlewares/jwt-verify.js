// Load modules

var Boom = require('boom');
var Hoek = require('hoek');
var jwt  = require('jsonwebtoken');


// Declare internals

var internals = {};


exports.register = function (server, options, next) {

  server.auth.scheme('jwt', internals.implementation);
  next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};


internals.implementation = function (server, options) {

  Hoek.assert(options, 'Missing jwt auth strategy options');
  Hoek.assert(options.key, 'Missing required private key in configuration');

  var settings = Hoek.clone(options);
  settings.verifyOptions = settings.verifyOptions || {};

  var scheme = {
    authenticate: function (request, reply) {

      var req = request.raw.req;
      var authorization = req.headers.authorization;
      
      if (!authorization) {
        return reply(Boom.unauthorized(null, 'Bearer'));
      }

      // var parts = authorization.split(/\s+/);

      // if (parts.length !== 2) {
      //   return reply(Boom.badRequest('Bad HTTP authentication header format', 'Bearer'));
      // }

      // if (parts[0].toLowerCase() !== 'bearer') {
      //   return reply(Boom.unauthorized(null, 'Bearer'));
      // }

      // if(parts[1].split('.').length !== 3) {
      //   return reply(Boom.badRequest('Bad HTTP authentication header format', 'Bearer'));
      // }

      var token = authorization;

      jwt.verify(token, settings.key, settings.verifyOptions || {}, function(err, decoded) {

        if(err && err.message === 'jwt expired') {
          return reply({
                        status: false, 
                        message: 'O token temporário está expirado. Deve refazer o login novamente.'
                      });
        } else if (err) {
          return reply({
                        status: false, 
                        message: 'O token temporário está expirado. Deve refazer o login novamente.'
                      });
        }

        if (!settings.validateFunc) {
          return reply.continue({ credentials: decoded });
        }


        settings.validateFunc(request, decoded, function (err, isValid, credentials) {

          credentials = credentials || null;

          if (err) {
            return reply(err, null, { credentials: credentials });
          }

          if (!isValid) {
            return reply(Boom.unauthorized('O token temporario esta invalido deve fazer o login novamente', 'Bearer'), null, { credentials: credentials });
          }

          if (!credentials || typeof credentials !== 'object') {

            return reply(Boom.badImplementation('Bad credentials object received for jwt auth validation'), null, { log: { tags: 'credentials' } });
          }

          // Authenticated

          return reply.continue({ credentials: credentials });
        });

      });

    }
  };

  return scheme;
};