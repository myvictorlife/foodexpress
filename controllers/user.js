var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID
var User = require('../models/user')
var Address = require('../models/address')
var randomstring = require("randomstring")
const crypt = require('../config/cryptography');
const serverEndpoints = require('../config/server-endpoints')
var SendEmail = require('../config/sendemail')

function UserController() {};
UserController.prototype = (function() {

	return {
		findByID: function findByID(request, reply) {
			console.log("passei aqui")
			User.findOne({_id: ObjectId(request.params.id)}, function(err, user) {
				if (err) {
					reply(err)
				} else if (user) {
					reply(user);
				} else {
					reply({
						'status': false,
						'message': 'Nenhum usuário encontrado'
					});
				}
			})
		},
		findByEmail: function findByEmail(request, reply) {

			User.aggregate([{
				$match: {
					email: request.params.email
				}
			}, {
				$lookup: {
					from: "addresses",
					localField: "_id",
					foreignField: "userID",
					as: "address"
				}
			}], function(err, user) {
				if (err) {
					reply(err)
				} else if (user.length > 0) {
					reply(user[0]);
				} else {
					reply({
						'status': true,
						'message': 'Nenhum usuário encontrado'
					});
				}
			})

		},
		find: function find(request, reply) {

			User.aggregate([{
				$lookup: {
					from: "addresses",
					localField: "_id",
					foreignField: "userID",
					as: "address"
				}
			}], function(err, result) {
				if (err) {
					reply({
						status: false,
						message: errmsg
					})
				} else {
					reply(result)
				}
			})
		},
		insert: function insert(request, reply) {
			user = request.payload

			var newPassword = randomstring.generate(5)
			var userSchema = new User({
				name: user.name,
				email: user.email,
				password: newPassword,
				phone: user.phone,
				updated_at: null
			});

			userSchema.encrypt(function(err, password) {});

			userSchema.save(function(err, result) {
				if (err) {
					reply({
						status: false,
						message: err.errmsg
					})
				} else {
					var userMessage = 'Seja bem vindo '+user.name+'! A senha será enviada para o seu email.'
					SendEmail.sendEmail(user.name, newPassword, user.email, userMessage, reply)
				}

			})
		},
		update: function update(request, reply) {

			user = request.payload
			user.updated_at = new Date()

			User.findOneAndUpdate({
				email: user.email
			}, user, function(err, user) {
				if (err) {
					reply(err)
				} else {
					reply({
						status: true,
						message: 'Usuário editado com sucesso.'
					})
				}
			});

		},
		changePassword: function changePassword(request, reply) {

			email = request.payload.email
			oldPassword = request.payload.oldPassword	
			newPassword = request.payload.newPassword
			checkPassword = request.payload.repeatPassword
			if (newPassword === checkPassword) {
				//user.updated_at = new Date()

				User.findOne({
					email: email
				}, function(err, user) {
					if (err) {
						reply(err)
					} else {
						if (user) {
							console.log(user.password)
							console.log(oldPassword)
							if (user.password === crypt.encrypt(oldPassword)) {
								User.findOneAndUpdate({
									email: user.email
								}, {password: crypt.encrypt(newPassword)}, function(err, user) {
									if (err) {
										reply(err)
									} else {
										reply({
											status: true,
											message: 'Senha editada com sucesso.'
										})
									}
								});
							} else {
								reply({
									status: false,
									message: 'Senha incorreta.'
								})
							}

						} else {
							reply({
								status: false,
								message: 'Usuário não encontrado'
							})
						}

					}
				});
			} else {
				reply({
					status: false,
					message: "As senhas não correspondem."
				})
			}


		},
		delete: function(request, reply) {
			console.log("delete")
		}
	}
})();

var userController = new UserController();
module.exports = userController;