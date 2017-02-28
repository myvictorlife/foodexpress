var User = require('../models/user')
var SendEmail = require('../config/sendemail')
const crypt = require('../config/cryptography');
var randomstring = require("randomstring")


function EmailController() {};
EmailController.prototype = (function() {

	return {
		sendEmail: function sendEmail(request, reply) {

			var newPassword = randomstring.generate(5)
			var userEmail = request.params.email

			User.findOneAndUpdate({
				email: userEmail
			}, {
				password: crypt.encrypt(newPassword)
			}, function(err, user) {

				if (err) {
					reply({
						status: false,
						message: err.errmsg
					})
				} else {
					if (user) {
						var userMessage = 'A nova senha foi enviado para o seu email.'
						SendEmail.sendEmail(user.name, newPassword, userEmail, userMessage, reply)

					} else {
						reply({
							status: false,
							message: 'Usuário não encontrado.'
						})
					}

				}
			})



		}
	}
})();

var emailController = new EmailController();
module.exports = emailController;