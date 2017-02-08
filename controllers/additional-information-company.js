'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const serverEndpoints = require('../config/server-endpoints')
const ValidateSchema = require('./validate-schema')

function AdditionalInformationController() {};
AdditionalInformationController.prototype = (function() {

	return {
		findByID: function findByID(request, reply) {
			var id = request.params.id
			if (!ObjectId.isValid(id)) {
				reply({
					status: false,
					id: 'ID inserio é inválido.'
				})
			} else {
				MongoClient.connect(serverEndpoints.URL_MONGO, function(err, db) {
					if (err) {
						reply({
							status: false,
							message: 'Unable to connect to the mongoDB server. Error:',
							err
						});
					} else {
						var collection = db.collection('AdditionalInformationCompany');
						// Insert some users
						collection.findOne({
							companyId: request.params.id
						}, function(err, result) {
							if (err) {
								console.log(err);
							} else {
								if (result) {
									reply(result)
								} else {
									reply({
										status: false,
										message: "Nenhum dado adicional foi encontrado.	"
									})
								}

							}
							//Close connection
							db.close();
						});
					}
				});
			}
		},
		insert: function insert(request, reply) {

			var validate = ValidateSchema(request.payload, 'AdditionalInformation')
			if (typeof validate == 'boolean' && validate) {
				var addtionalInformation = request.payload
					// Use connect method to connect to the Server
				console.log(serverEndpoints.URL_MONGO)
				MongoClient.connect(serverEndpoints.URL_MONGO, function(err, db) {
					if (err) {
						reply({
							status: false,
							message: 'Unable to connect to the mongoDB server. Error:',
							err
						});
					} else {
						var collection = db.collection('AdditionalInformationCompany');

						collection.findOne({
							companyId: request.params.id
						}, function(err, result) {
							if (err) {
								console.log(err);
							} else {
								if (result) {
									reply({
										status: false,
										message: 'Dados adicicionais já existe para essa empresa.'
									})
								} else {
									// Insert some users
									collection.insert(addtionalInformation, function(err, result) {
										if (err) {
											console.log(err);
										} else {
											reply({
												status: true,
												message: 'Os dados adicionais da empresa foi cadastrado com sucesso.'
											})
										}
										//Close connection
										db.close();
									});
								}

							}
							//Close connection
							db.close();
						});


					}
				});
			} else {
				reply(validate)
			}


		},
		update: function update(request, reply) {

			var validate = ValidateSchema(request.payload, 'AdditionalInformation')
			if (typeof validate == 'boolean' && validate) {
				var addtionalInformation = request.payload
				var id = addtionalInformation._id
				if (!ObjectId.isValid(id)) {
					reply({
						status: false,
						id: 'ID inserio é inválido.'
					})
				} else {

					delete addtionalInformation._id
					MongoClient.connect(serverEndpoints.URL_MONGO, function(err, db) {
						if (err) {
							reply({
								status: false,
								message: 'Unable to connect to the mongoDB server. Error:',
								err
							});
						} else {
							var collection = db.collection('AdditionalInformationCompany');
							// Insert some users
							collection.update({
								_id: ObjectId(id)
							}, addtionalInformation, function(err, result) {

								if (err) {
									console.log(err);
								} else {
									if (result.result.nModified > 0) {
										reply({
											status: true,
											message: 'Os dados adicionais foram editados com sucesso.'
										})
									} else {
										reply({
											status: false,
											message: "Dados adicionais não encontrado para essa empresa."
										})
									}

								}
								//Close connection
								db.close();
							});
						}
					});
				}
			} else {
				reply(validate)
			}
		},
		delete: function(request, reply) {
			console.log("delete")
		}
	}
})();

var additionalInformationController = new AdditionalInformationController();
module.exports = additionalInformationController;