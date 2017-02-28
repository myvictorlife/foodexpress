var Ajv = require('ajv')
var ajv = Ajv({
	allErrors: true
})

var AdditionalInformation = require('../schemas/additional-information-company-schema')
var User = require('../schemas/user-schema')
var Authenticate = require('../schemas/authenticate-schema')
var Address = require('../schemas/address-schema')

var validate = ajv.compile(AdditionalInformation)

var validateSchema = function (json, schema) {

	var validate;
	if(schema == 'AdditionalInformation'){
		validate = ajv.compile(AdditionalInformation)
	}

	if(schema == 'User'){
		validate = ajv.compile(User)
	}

	if(schema == 'Authenticate'){
		validate = ajv.compile(Authenticate)
	}
	
	if(schema == 'Address'){
		validate = ajv.compile(Address)
	}

	if(schema){
		if(validate(json)){
			return true
		}else{
			return {status: false, message: ajv.errorsText(validate.errors)}
		}
	}else{
		return {status: false, message: 'Nenhum schema foi selecionado'}
	}
	
}

module.exports = validateSchema;