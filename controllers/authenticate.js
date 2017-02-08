const crypt = require('../config/cryptography')
const serverEndpoints = require('../config/server-endpoints')
var User = require('../models/user')

var jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
    moment = require('moment'),
    middlwareJwt = require('../middlewares/middleware-jwt');
var mongoose = require('mongoose');

var verifyPassword = function(userPassword, password){
  if(userPassword === password)
    return true
  else return false
}

function AuthenticateController(){};
AuthenticateController.prototype = (function(){

	return {
		authenticate: function findByID(request, reply) {

			var email = request.payload.email
		    var password = crypt.encrypt(request.payload.password) 

		    User.findOne({email: email}, function(err, user) {
				if (err) {
					reply(err)
				} else if (user) {
					if(!verifyPassword(user.password, password)){
		              reply({'status': false, 'message':'Senha inválida'});
		            }else{
		              // Se não tiver nenhum erro, então criamos o Token para ele
		              var token = jwt.sign(user, middlwareJwt.privateKey, {expiresIn: '24h'})
                      reply({token:token, "message":"Login efetuado com sucesso", "success":true})
		            } 
				} else {
					reply({'status': true, 'message':'Nenhum usuário encontrado'});
				}
			})

		}
	}
})();

var authenticateController = new AuthenticateController();
module.exports = authenticateController;