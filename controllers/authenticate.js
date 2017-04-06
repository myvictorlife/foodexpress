const crypt = require('../config/cryptography')
const serverEndpoints = require('../config/server-endpoints')
const ValidateSchema = require('./validate-schema')
var validator = require('validator');

var User = require('../models/user')
var randomstring = require("randomstring")

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

var saveUser = function (user, reply){
	var newPassword = randomstring.generate(10)
	console.log(user)
	var userSchema = new User({
		name: user.name,
		email: user.email,
		password: newPassword,
		phone: user.phone,
		updated_at: null
	});
	console.log(userSchema)
	userSchema.encrypt(function(err, password) {});

	userSchema.save(function(err, result) {
		
		if (err) {
			reply({
				status: false,
				message: err.errmsg
			})
		} else {

			var token = jwt.sign(result, middlwareJwt.privateKey, {expiresIn: '24h'})
            reply({token:token, "message":"Login efetuado com sucesso", "success":true})
	
		}

	})
}

function AuthenticateController(){};
AuthenticateController.prototype = (function(){

	return {
		authenticate: function authenticate(request, reply) {
			
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

							console.log(crypt.decrypt(user.password))
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
			
			

		},
		authenticateByFacebook: function authenticateByFacebook(request, reply) {

			var payload = request.payload
			
		    User.findOne({email: payload.email}, function(err, user) {
				if (err) {
					reply(err)
				} else if (user) {					
	                // Se não tiver nenhum erro, então criamos o Token para ele
	                var token = jwt.sign(user, middlwareJwt.privateKey, {expiresIn: '24h'})
                    reply({token:token, "message":"Login efetuado com sucesso", "success":true})
				} else {
					saveUser(payload, reply)
					//reply({'status': true, 'message':'Nenhum usuário encontrado'});
				}
			})
		
		}
	}
})();

var authenticateController = new AuthenticateController();
module.exports = authenticateController;
