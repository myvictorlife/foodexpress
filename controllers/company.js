var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID
const serverEndpoints = require('../config/server-endpoints')
var Company = require('../models/company')

function UserController() {};
UserController.prototype = (function() {

	return {
		findByID: function findByID(request, reply) {
			Company.findOne({_id: ObjectId(request.params.id)}, function(err, company) {
				if (err) {
					reply(err)
				} else if (company) {
					reply(company);
				} else {
					reply({
						'status': false,
						'message': 'Nenhuma empresa encontrada.'
					});
				}
			})
		},
		find: function find(request, reply) {

			Company.find({}, function(err, result) {
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
			company = request.payload

			var companySchema = new Company({
				name: company.name,
				type: company.type,
				open: false,
				latitude: company.latitude,
				longitude: company.longitude
			});

			companySchema.save(function(err, result) {
				if (err) {
					reply({
						status: false,
						message: err.errmsg
					})
				} else {
					reply({
						status: true,
						message: 'Empresa foi criada com sucesso.'
					})
				}

			})

		},
		update: function update(request, reply) {

			company = request.payload
			company.updated_at = new Date()

			Company.findOneAndUpdate({
				_id: company._id
			}, company, function(err, company) {
				if (err) {
					reply(err)
				} else {
					reply({
						status: true,
						message: 'Empresa editada com sucesso.'
					})
				}
			});

		},
		delete: function(request, reply) {
			console.log("delete")
		}
	}
})();

var userController = new UserController();
module.exports = userController;