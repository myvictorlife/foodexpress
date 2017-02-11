module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "title": "Root schema.",
  "description": "An explanation about the purpose of this instance.",
  "properties": {
    "companyId": {
      "type": "string",
      "minLength": 1,
      "title": "CompanyId schema.",
      "description": "An explanation about the purpose of this instance."
    },
    "foodOrder": {
      "type": "array",
      "uniqueItems": false,
      "title": "FoodOrder schema.",
      "description": "An explanation about the purpose of this instance.",
      "items": {
        "type": "object",
        "title": "0 schema.",
        "description": "An explanation about the purpose of this instance.",
        "properties": {
          "order": {
            "type": "array",
            "uniqueItems": false,
            "title": "Order schema.",
            "description": "An explanation about the purpose of this instance.",
            "items": {
              "type": "object",
              "title": "0 schema.",
              "description": "An explanation about the purpose of this instance.",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "title": "Name schema.",
                  "description": "An explanation about the purpose of this instance."
                },
                "ingredients": {
                  "type": "string",
                  "title": "Ingredients schema.",
                  "description": "An explanation about the purpose of this instance."
                },
                "price": {
                  "type": "string",
                  "minLength": 1,
                  "title": "Price schema.",
                  "description": "An explanation about the purpose of this instance."
                }
              },
              "required": [
                "name",
                "ingredients",
                "price"
              ]
            }
          }
        },
        "required": [
          "order"
        ]
      }
    },
    "address": {
      "type": "object",
      "title": "Address schema.",
      "description": "An explanation about the purpose of this instance.",
      "properties": {
        "street": {
          "type": "string",
          "minLength": 1,
          "title": "Street schema.",
          "description": "An explanation about the purpose of this instance."
        },
        "number": {
          "type": "integer",
          "title": "Number schema.",
          "description": "An explanation about the purpose of this instance."
        },
        "neighborhood": {
          "type": "string",
          "minLength": 1,
          "title": "Neighborhood schema.",
          "description": "An explanation about the purpose of this instance."
        },
        "complement": {
          "type": "string",
          "minLength": 1,
          "title": "Complement schema.",
          "description": "An explanation about the purpose of this instance."
        },
        "city": {
          "type": "string",
          "minLength": 1,
          "title": "City schema.",
          "description": "An explanation about the purpose of this instance."
        },
        "zip_code": {
          "type": "string",
          "minLength": 1,
          "title": "Zip_code schema.",
          "description": "An explanation about the purpose of this instance."
        }
      },
      "required": [
        "street",
        "number",
        "neighborhood",
        "complement",
        "city",
        "zip_code"
      ]
    },
    "dayOfWeek": {
      "type": "array",
      "uniqueItems": false,
      "title": "DayOfWeek schema.",
      "description": "An explanation about the purpose of this instance.",
      "items": [
        {
          "type": "object",
          "title": "0 schema.",
          "description": "An explanation about the purpose of this instance.",
          "properties": {
            "day": {
              "type": "string",
              "minLength": 1,
              "title": "Day schema.",
              "description": "An explanation about the purpose of this instance."
            },
            "timeOpen": {
              "type": "string",
              "minLength": 1,
              "title": "TimeOpen schema.",
              "description": "An explanation about the purpose of this instance."
            },
            "timeClose": {
              "type": "string",
              "minLength": 1,
              "title": "TimeClose schema.",
              "description": "An explanation about the purpose of this instance."
            }
          }
        },
        {
          "type": "object",
          "title": "1 schema.",
          "description": "An explanation about the purpose of this instance.",
          "properties": {
            "day": {
              "type": "string",
              "minLength": 1,
              "title": "Day schema.",
              "description": "An explanation about the purpose of this instance."
            },
            "timeOpen": {
              "type": "string",
              "minLength": 1,
              "title": "TimeOpen schema.",
              "description": "An explanation about the purpose of this instance."
            },
            "timeClose": {
              "type": "string",
              "minLength": 1,
              "title": "TimeClose schema.",
              "description": "An explanation about the purpose of this instance."
            }
          }
        }
      ]
    },
    "payment": {
      "type": "array",
      "uniqueItems": false,
      "title": "Payment schema.",
      "description": "An explanation about the purpose of this instance.",
      "items": [
        {
          "type": "object",
          "title": "0 schema.",
          "description": "An explanation about the purpose of this instance.",
          "properties": {
            "card": {
              "type": "string",
              "minLength": 1,
              "title": "Card schema.",
              "description": "An explanation about the purpose of this instance."
            }
          }
        },
        {
          "type": "object",
          "title": "1 schema.",
          "description": "An explanation about the purpose of this instance.",
          "properties": {
            "card": {
              "type": "string",
              "minLength": 1,
              "title": "Card schema.",
              "description": "An explanation about the purpose of this instance."
            }
          }
        }
      ]
    },
    "aboutUs": {
      "type": "string",
      "minLength": 1,
      "title": "AboutUs schema.",
      "description": "An explanation about the purpose of this instance."
    }
  },
  "required": [
    "companyId",
    "foodOrder",
    "address",
    "dayOfWeek",
    "payment",
    "aboutUs"
  ]
}