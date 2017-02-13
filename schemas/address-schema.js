module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 0
    },
    "userID": {
      "type": "string",
      "minLength": 1
    },
    "street": {
      "type": "string",
      "minLength": 1
    },
    "number": {
      "type": "string",
      "minLength": 1
    },
    "neighborhood": {
      "type": "string",
      "minLength": 1
    },
    "complement": {
      "type": "string",
      "minLength": 0
    },
    "city": {
      "type": "string",
      "minLength": 1
    },
    "cep": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "userID",
    "street",
    "number",
    "neighborhood",
    "city",
    "cep"
  ]
}