var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID
const serverEndpoints = require('../config/server-endpoints')
var CompanyUser = require('../models/company-user')

const crypt = require('../config/cryptography')

function CompanyUserController() {};
CompanyUserController.prototype = (function() {

	return {
		findByID: function findByID(request, reply) {

			CompanyUser.findOne({_id: ObjectId(request.params.userId),
								companyID: ObjectId(request.params.companyId)}, function(err, company) {
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

			CompanyUser.find({companyID: ObjectId(request.params.id)}, function(err, result) {
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
			
			company.password = crypt.encrypt(company.password)
			var companySchema = new CompanyUser({
				companyID: ObjectId(company.companyID), 
				img: company.img,
				name: company.name,
				password: company.password,
				permission: company.permission
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
						message: 'Usuário foi criado com sucesso.'
					})
				}

			})

		},
		update: function update(request, reply) {

			company = request.payload
			company.updated_at = new Date()

			if(company.password){
				company.password = crypt.encrypt(company.password)
			}

			CompanyUser.findOneAndUpdate({
				_id: ObjectId(company._id)
			}, company, function(err, company) {
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
		delete: function(request, reply) {
			CompanyUser.remove({_id: ObjectId(request.params.id)}, function(err, address){
				if(err){
					reply({
						status: false,
						message: 'Não foi possível remover o usuário. Tente mais tarde!'
					})	
				}else{
					reply({
						status: true,
						message: 'Usuário removido com sucesso.'
					})
				}
			})
		}
	}
})();

var companyUserController = new CompanyUserController();
module.exports = companyUserController;