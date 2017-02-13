const serverEndpoints = require('../config/server-endpoints')
const ValidateSchema = require('./validate-schema')
var Address = require('../models/address')
var ObjectId = require('mongodb').ObjectID
var validator = require('validator')

var jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	moment = require('moment'),
	middlwareJwt = require('../middlewares/middleware-jwt');


var validateFields = function(address, noValid){
	
	if (noValid && (!address._id || !ObjectId.isValid(address._id))){

		if(!address._id){
			return {
				status: false,
				message: 'Id não foi informado.'
			}
		}else{
			return {
				status: false,
				message: 'Id inserio é inválido.'
			}
		}
		
	}
	
	if (!address.userID || !ObjectId.isValid(address.userID)) {

		return {
			status: false,
			message: 'Id do usuário inserio é inválido.'
		}
	}

	if(validator.isEmpty(address.street.trim())){
		return  {    
				status: false,
				message: 'Endereço deve ser inserido.'
			}
	}
	
	if(validator.isEmpty(address.number.trim())){
		return  {    
				status: false,
				message: 'Número deve ser inserido.'
			}
	}

	if(validator.isEmpty(address.neighborhood.trim())){
		return  {    
				status: false,
				message: 'Bairro deve ser inserido.'
			}
	}

	if(validator.isEmpty(address.city.trim())){
		return  {    
				status: false,
				message: 'Cidade deve ser inserida.'
			}
	}
	
	var regex = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
	if(address.cep.match( regex ) == null){
		return {    
				status: false,
				message: 'CEP é inválido. Deve estar no formato XX.XXX-XXX'
			}	
	}
	
	return {status: true}
}

function AddressController() {};
AddressController.prototype = (function() {

	return {
		insert: function insert(request, reply) {

			var validate = ValidateSchema(request.payload, 'Address')
			if (typeof validate == 'boolean' && validate) {

				address = request.payload
				var json = validateFields(address, false)
				if(json.status){

					var addressSchema = new Address({
						userID: address.userID,
						street: address.street,
						number: address.number,
						neighborhood: address.neighborhood,
						complement: address.complement,
						city: address.city,
						cep: address.cep,
						updated_at: null
					});

					addressSchema.save(function(err, result) {

						if (err) {
							reply({
								status: false,
								message: err.message
							})
						} else {
							reply({
								status: true,
								message: 'Endereço salvo com sucesso'
							})
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
		update: function update(request, reply) {

			var validate = ValidateSchema(request.payload, 'Address')
			if (typeof validate == 'boolean' && validate) {

				address = request.payload
				var json = validateFields(address, true)
				if(json.status){

					address.updated_at = new Date()
					address.userID = ObjectId(address.userID)

					var id = address._id
					delete address._id

					Address.findOneAndUpdate({
						_id: ObjectId(id)
					}, address, function(err, address) {
						if (err) {
							reply(err)
						} else {
							reply({
								status: true,
								message: 'Endereço editado com sucesso.'
							})
						}
					});

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
		findByID: function findByID(request, reply) {

			Address.find({
				userID: ObjectId(request.params.id)
			}, function(err, addresses) {
				console.log(addresses)
				if (err) {
					reply({
						status: false,
						message: err.errmsg
					})
				} else {
					reply(addresses)
				}
			})

		},
		delete: function(request, reply) {
			Address.remove({_id: ObjectId(request.params.id)}, function(err, address){
				if(err){
					reply({
						status: false,
						message: 'Não foi possível remover o endereço. Tente mais tarde!'
					})	
				}else{
					reply({
						status: true,
						message: 'Endereço removido com sucesso.'
					})
				}
			})
		}
	}
})();

var addressController = new AddressController();
module.exports = addressController;