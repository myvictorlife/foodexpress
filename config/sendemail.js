var nodemailer = require('nodemailer')
// O primeiro passo é configurar um transporte para este
// e-mail, precisamos dizer qual servidor será o encarregado
// por enviá-lo:
var transporte = nodemailer.createTransport({
	service: 'Gmail', // Como mencionei, vamos usar o Gmail
	auth: {
		user: 'suacomidaonline@gmail.com', // Basta dizer qual o nosso usuário
		pass: 'fxj*()20200' // e a senha da nossa conta
	}
});


function SendEmail() {};
SendEmail.prototype = (function() {

	return {
		sendEmail: function sendEmail(name, newPassword, email, userMessage, reply) {

			// Após configurar o transporte chegou a hora de criar um e-mail
			// para enviarmos, para isso basta criar um objeto com algumas configurações
			var email = {
				from: 'suacomidaonline@gmail.com', // Quem enviou este e-mail
				to: email, // Quem receberá
				subject: '♥ Sua comida online ♥', // Um assunto bacana :-) 
				html: '<strong> Olá, ' + name + '</strong><br/>' +
					'Sua nova senha é: ' + newPassword
			};
			// Pronto, tudo em mãos, basta informar para o transporte
			// que desejamos enviar este e-mail
			console.log(email)
			transporte.sendMail(email, function(err, info) {
				if (err)
					throw err; // Oops, algo de errado aconteceu.
				reply({
					status: true,	
					message: userMessage
				})
			});

		}
	}
})();

var sendEmail = new SendEmail();
module.exports = sendEmail;