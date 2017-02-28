const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');
const Routes = require('./routes');

var config = {};
var server = new hapi.Server(config);
server.register([Vision, Inert, Lout], (err) => {

    if (err)
        console.error('Failed loading plugins');
        process.exit(1);

    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});