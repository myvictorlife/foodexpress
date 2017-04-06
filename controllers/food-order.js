'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


const serverEndpoints = require('../config/server-endpoints')
var FoodOrder = require('../models/food-order')

var validate = function(userID, companyID) {

	if (!ObjectId.isValid(userID) && !ObjectId.isValid(companyID)) {
		return ({
			status: false,
			id: 'Id do usuário e Id da empresa esta inválido.'
		})
	}
	if (!ObjectId.isValid(userID)) {
		return ({
			status: false,
			id: 'Id do usuário é inválido.'
		})
	}

	if (!ObjectId.isValid(companyID)) {
		return ({
			status: false,
			id: 'Id da empresa é inválido.'
		})
	}
	return true;
}

function FoodOrderController() {};
FoodOrderController.prototype = (function() {

	return {
		findByUserId: function findByUserId(request, reply) {
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
							message: 'Erro ao tentar buscar os pedidos.'
						});
					} else {
						var collection = db.collection('FoodOrder');

						collection.find({userID: id}).sort({ created_at: -1 }).toArray(function (err, items) {
				        if (err) {
								reply({
									status: false,
									message: 'Erro ao tentar registrar o pedido.'
								});
							}else{
								reply(items)
							}
							db.close()
				    });

					}
				});
			}
		},
		findByCompanyId: function findByCompanyId(request, reply) {
			var id = request.params.id
			console.log(id)
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
							message: 'Erro ao tentar buscar os pedidos.'
						});
					} else {
						var collection = db.collection('FoodOrder');

						collection.aggregate([{
					        $match: {
					                    companyID: id
					                }
					    },{
				            $lookup: {
				                    from: "users",
				                    localField: "userID",
				                    foreignField: "_id",
				                    as: "user"
				            }
					    }], function(err, user) {
					            if (err) {
					                    reply(err)
					            } else if (user.length > 0) {
					                    reply(user);
					            } else {
					                    reply({
					                            'status': true,
					                            'message': 'Nenhum usuário encontrado'
					                    });
					            }
					    })

					}
				});
			}
		},
		insert: function insert(request, reply) {
			var foodOrder = request.payload

			var valid = validate(foodOrder.userID, foodOrder.companyID)
			if (typeof valid != 'boolean') {
				reply(valid)
			} else {
				MongoClient.connect(serverEndpoints.URL_MONGO, function(err, db) {
					if (err) {
						reply({
							status: false,
							message: 'Unable to connect to the mongoDB server. Error:',
							err
						});
					} else {
						foodOrder.created_at = new Date()
						console.log(foodOrder)
						var collection = db.collection('FoodOrder');

						collection.insert(foodOrder, function(err, result) {
							if (err) {
								reply({
									status: false,
									message: 'Erro ao tentar registrar o pedido.'
								});
							} else {
								reply({
									status: true,
									message: 'O pedido foi realizado com sucesso.'
								})
							}
							//Close connection
							db.close();
						});

					}
				});
			}

		},
		update: function update(request, reply) {

			var foodOrder = request.payload


		},
		delete: function(request, reply) {
			console.log("delete")
		}
	}
})();

var foodOrderController = new FoodOrderController();
module.exports = foodOrderController;