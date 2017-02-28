POST
http://localhost:8080/relationship/favorite
{
	"userId": "589104e049e85f1ea738a670",
	"companyId": "58924c7b85128c1244371a76",
	"option": "rm"/"add"
}

Retorno
{
"status": true,
"message": "Removido dos favoritos"
}
ou
{
"status": true,
"message": "Adicionado aos favoritos"
}

Header
authorization: token