var ObjectId = require('mongodb').ObjectID
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
const serverEndpoints = require('../config/server-endpoints')


function RelationshipController() {};
RelationshipController.prototype = (function() {

	return {
		favorite: function favorite(request, reply) {
			var favorite = request.payload
			MongoClient.connect(serverEndpoints.URL_MONGO, function(err, db) {
				if (err) {
					reply({
						status: false,
						message: 'Erro ao tentar buscar as companias relacionadas.'
					});
				} else {
					var collection = db.collection('users');
					
					if(favorite.option == 'add'){
						collection.update(
						    {"_id": ObjectId(favorite.userId)},
						    { $addToSet: { "companies": favorite.companyId } 
						 }, function (err, favorite) {
				        	if (err) {
								reply({
									status: false,
									message: 'Erro ao tentar adicionar aos favoritos.'
								});
							}else{
								reply({
									status: true,
									message: 'Adicionado aos favoritos'
								})
							}
							db.close()
				    	});
					}else{
						collection.update(
						    {"_id": ObjectId(favorite.userId)},
						    { $pull: { "companies": favorite.companyId } 
						 }, function (err, favorite) {
				        	if (err) {
								reply({
									status: false,
									message: 'Erro ao tentar adicionar aos favoritos.'
								});
							}else{
								reply({
									status: true,
									message: 'Removido dos favoritos'
								});
							}
							db.close()
				    	});	
					}
					

				}
			});
		}
	}
})();

var relationshipController = new RelationshipController();
module.exports = relationshipController;