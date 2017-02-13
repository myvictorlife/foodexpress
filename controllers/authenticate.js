const crypt = require('../config/cryptography')
const serverEndpoints = require('../config/server-endpoints')
const ValidateSchema = require('./validate-schema')
var validator = require('validator');

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


var validateFields = function(email, password){
	
	if(!validator.isEmail(email)){
		return {    
				status: false,
				message: 'Email incorreto.'
			}
	}

	if(validator.isEmpty(password.trim())){
		console.log("Entrei")
		return  {    
				status: false,
				message: 'Senha deve ser inserida.'
			}
	}

	return {status: true}
}

function AuthenticateController(){};
AuthenticateController.prototype = (function(){

	return {
		authenticate: function findByID(request, reply) {

			var validate = ValidateSchema(request.payload, 'Authenticate')
			if (typeof validate == 'boolean' && validate) {

				var email = request.payload.email
				var password = request.payload.password

				var json = validateFields(email, password)
				
				if(json.status){
					var password = crypt.encrypt(password)
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
				}else{
					reply({
							status: json.status,
							message: json.message
						})
				}

			}else{
				reply(validate)
			}
			
			

		}
	}
})();

var authenticateController = new AuthenticateController();
module.exports = authenticateController;