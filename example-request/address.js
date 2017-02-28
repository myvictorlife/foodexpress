GET + Header(authorization: token)
http://localhost:8080/address/:userId

Retorno
[
  {
	"_id": "589a7eac8b27df31a9abcd64",
	"userID": "5899c84ef9d9606bf7e5f54b",
	"street": "Rua Estacio de Sá",
	"number": "1330",
	"neighborhood": "Miranda",
	"city": "Araguari",
	"updated_at": null,
	"__v": 0,
	"created_at": "2017-02-08T02:13:00.592Z"
  }
]
*********************************************************************************
*********************************************************************************
*********************************************************************************

POST
http://localhost:8080/address
{
	"userID": "5899c84ef9d9606bf7e5f54b",
	"street": "Rua Estacio de Sá",
	"number": "1330",
    "complement": "Casa",
	"neighborhood": "Miranda 111",
	"city": "Araguari 11"
}

Retorno
{
"status": true,
"message": "Endereço editado com sucesso."
}

*********************************************************************************
*********************************************************************************
*********************************************************************************

PUT + Header(authorization: token)
http://localhost:8080/address
{
    "_id": "58a22398c9b31c17b0c3531a",
	"userID": "5899c84ef9d9606bf7e5f54b",
	"street": "Rua Estacio de Sá",
	"number": "1330",
    "complement": "Casa",
	"neighborhood": "Miranda 111",
	"city": "Araguari 11",
    "cep": "11.111-111"
}

Retorno
{
"status": true,
"message": "Endereço editado com sucesso."
}
*********************************************************************************
*********************************************************************************
*********************************************************************************

DELETE
Não possui
