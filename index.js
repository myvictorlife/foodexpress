'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');

const Authenticate = require('./routes/authenticate');
const User = require('./routes/user')
const Address = require('./routes/address')
const Email = require('./routes/email')
const Company = require('./routes/company')
const CompanyUser = require('./routes/company-user')
const FoodOrder = require('./routes/food-order')
const Relationship = require('./routes/relationship')
const Upload = require('./routes/upload')
const Path = require('path');

const AdditionalInformationCompany = require('./routes/additional-information-company')

var middlwareJwt = require('./middlewares/middleware-jwt')
var hapiAuthJwt = require('./middlewares/jwt-verify')

const config = {
   connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
};
const server = new Hapi.Server(config);

//const port = 8080;
const host = 'localhost';
const port = 9000;

server.connection({
  port: port,
  host: host,
  routes: {
    cors: true
  }
});

const loutRegister = {
    register: Lout,
    options: { endpoint: '/docs' }
};

var validate = function (request, decodedToken, callback) {

    console.log(decodedToken);  // should be {accountId : 123}.

    if (decodedToken) {
      console.log(decodedToken.accountId.toString());
    }

    var account = accounts[decodedToken.accountId];

    if (!account) {
      return callback(null, false);
    }

    return callback(null, true, account);
};

server.register([Vision, Inert, loutRegister, hapiAuthJwt], function(err) {

    if (err) {
        console.error('Failed loading plugins');
        process.exit(1);
    }

    server.auth.strategy('token', 'jwt', 
                        { key: middlwareJwt.privateKey,
                         validateFunc: middlwareJwt.verifyToken,
                         verifyOptions: { algorithms: [ 'HS256' ] }
                       });

    server.route(Authenticate)
    server.route(User)
    server.route(Address)
    server.route(Email)
    server.route(Company)
    server.route(CompanyUser)
    server.route(AdditionalInformationCompany)
    server.route(FoodOrder)
    server.route(Relationship)
    server.route(Upload)
    
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

    // Show image /public/upload
    server.route({
      method: 'GET',
      path: '/upload/{param*}',
      handler: {
          directory: {
              path: '.',
              redirectToSlash: true,
              index: true
          }
        }
    });

});

module.exports = server;