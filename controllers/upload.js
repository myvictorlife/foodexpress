var fs = require('fs')

function UploadController() {};
UploadController.prototype = (function() {

	return {
		upload: function upload(request, reply) {
			
			fs.exists('public/uploads/' + request.payload.filename, function(exists) {
				if (exists) {
					reply({
						status: 'false',
						message: 'Arquivo com nome: ' + request.payload.filename + ' já existe na base de dados.',
						url: '/upload/uploads/' + request.payload.filename
					})
				} else {
					fs.writeFile('public/uploads/' + request.payload.filename, request.payload.base64, 'base64', function(err) {
						reply({
							status: 'true',
							url: '/upload/uploads/' + request.payload.filename
						})
					})
				}
			});
		}
	}
})();

var uploadController = new UploadController();
module.exports = uploadController;