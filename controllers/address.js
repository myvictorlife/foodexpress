const serverEndpoints = require('../config/server-endpoints')
var Address = require('../models/address')
var ObjectID = require('mongodb').ObjectID

var jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	moment = require('moment'),
	middlwareJwt = require('../middlewares/middleware-jwt');


function AddressController() {};
AddressController.prototype = (function() {

	return {
		insert: function insert(request, reply) {

			address = request.payload
			var addressSchema = new Address({
				userID: address.userID,
				street: address.street,
				number: address.number,
				neighborhood: address.neighborhood,
				city: address.city,
				cep: address.cep,
				updated_at: null
			});

			addressSchema.save(function(err, result) {
				if (err) {
					reply({
						status: false,
						message: err.errmsg
					})
				} else {
					reply({
						status: true,
						message: 'Endereço salvo com sucesso'
					})
				}
			})

		},
		update: function update(request, reply) {
			address = request.payload
			address.updated_at = new Date()
			address.userID = ObjectID(address.userID)

			var id = address._id
			delete address._id

			console.log(address)
			Address.findOneAndUpdate({
				_id: ObjectID(id)
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
		},
		findByID: function findByID(request, reply) {

			Address.find({
				userID: ObjectID(request.params.id)
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
			Address.remove({_id: ObjectID(request.params.id)}, function(err, address){
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