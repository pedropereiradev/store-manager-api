
# Store Manager API

Este projeto consiste em uma API RESTful de gerenciamento de produtos e vendas no 
formato dropshipping utilizando arquitetura em camadas - MSC, e banco de dados 
MySQL. Tanto a aplicação quanto o banco de dados foram executados utilizando 
Docker.

## Stack utilizada

**Back-end:** Node, Express, Mocha, Chai, sinon, mysql2, Docker, mySQL


## Variáveis de Ambiente

Para rodar esse projeto sem utilizar Docker, você vai precisar adicionar as 
seguintes variáveis de ambiente no seu .env

`MY_SQL_HOST`
`MY_SQL_USER`
`MY_SQL_PASSWORD`
`MY_SQL_DATABASE`
`PORT`


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:pedropereiradev/store-manager-api.git
```

Entre no diretório do projeto

```bash
  cd store-manager-api
```

+ Utilizando Docker:
```bash
docker-compose up -d
docker exec -it store_manager bash
npm install
npm start
```

+ Rodando Localmente:

Necessário configurar as variáveis de ambiente conforme documentação antes
de rodar o projeto

```bash
  npm install
  npm start
```

## Documentação da API

+ [**Products**](#produtos)
    + [Listar todos](#retorna-todos-os-produtos)
    + [Listar um](#retorna-um-produto)
    + [Criar novo produto](#cria-um-novo-produto)
    + [Editar produto](#atualiza-um-produto)
    + [Deletar produto](#deleta-um-produto)
+ [**Sales**](#vendas)
    + [Listar todas](#retorna-todas-as-vendas)
    + [Lisar uma](#retorna-uma-venda)
    + [Criar nova venda](#cria-uma-nova-venda)
    + [Editar venda](#atualiza=uma-venda)
    + [Deletar venda](#deleta-uma-venda)

### Produtos

#### Retorna todos os produtos

```http
  GET /products
```

+ Response 200 (application/json)
    + Body

            [
                {
                    "id": 1,
                    "name": "Martelo de Thor",
                },
                {
                    "id": 2,
                    "name": "Traje de encolhimento",
                }
                /* ... */
            ]

#### Retorna um produto

```http
  GET /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Response 200 (application/json)
    + Body
  
            {
                "id": 1,
                "name": "Martelo de Thor",
            }

+ Response 404 (application/json)
    + Body

            {
                "message": "Product not found"
            }

#### Cria um novo produto

```http
    POST /products
```

+ Request (application/json)
    + Body

            {
                "name": "nome_do_produto",
            }

+ Response 201 (application/json)
    + Body

            {
                "id": 4,
                "name": "nome_do_produto"
            }


+ Request (application/json)
+ Response 400 (application/json)
    + Body

            {
                "message": "\"name\" is required"
            }

+ Request (application/json)
    + Body

            {
                "name": "nome",
            }

+ Response 422 (application/json)
    + Body

            {
                "message": "\"name\" length must be at least 5 characters long"
            }

#### Atualiza um produto

```http
  PUT /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Request (application/json)
    + Body

            {
                "name": "novo_nome",
            }

+ Response 201 (application/json)
    + Body

            {
                "id": 1,
                "name": "novo_nome"
            }

+ Response 404 (application/json)
    + Body

            {
                "message": "Product not found"
            }

#### Deleta um produto

```http
  DELETE /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Response 204 (application/json)
+ Response 404 (application/json)
    + Body

            {
                "message": "Product not found"
            }
    
### Vendas

#### Retorna todas as vendas

```http
  GET /sales
```

+ Response 200 (application/json)
    + Body

            [
                {
                    "saleId": 1,
                    "date": "2021-09-09T04:54:29.000Z",
                    "productId": 1,
                    "quantity": 2
                },
                {
                    "saleId": 1,
                    "date": "2021-09-09T04:54:54.000Z",
                    "productId": 2,
                    "quantity": 2
                }

                /* ... */
            ]

#### Retorna uma venda

```http
  GET /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Response 200 (application/json)
    + Body
  
            [
                {
                    "date": "2021-09-09T04:54:29.000Z",
                    "productId": 1,
                    "quantity": 2
                },
                {
                    "date": "2021-09-09T04:54:54.000Z",
                    "productId": 2,
                    "quantity": 2
                }

                /* ... */
            ]

+ Response 404 (application/json)
    + Body

            {
                "message": "Sale not found"
            }

#### Cria uma nova venda

```http
    POST /sales
```

+ Request (application/json)
    + Body

            [
                {
                    "productId": 1,
                    "quantity":1
                },
                {
                    "productId": 2,
                    "quantity":5
                }
            ]

+ Response 201 (application/json)
    + Body

            {
                "id": 3,
                "itemsSold": [
                    {
                        "productId": 1,
                        "quantity":1
                    },
                    {
                        "productId": 2,
                        "quantity":5
                    }
                ]
            }


+ Request (application/json)
    + Body

            [
                {
                "quantity":1
                },
                {
                "productId": 2,
                "quantity":5
                }
            ]

+ Response 400 (application/json)
    + Body

            { 
                "message": "\"productId\" is required"
            }

+ Request (application/json)
    + Body

            [
                {
                    "productId": 1
                },
                {
                    "productId": 2,
                    "quantity":5
                }
            ]

+ Response 400 (application/json)
    + Body

            { 
                "message": "\"quantity\" is required"
            }

+ Request (application/json)
    + Body

            [
                {
                    "productId": 1,
                    "quantity":0
                },
                {
                    "productId": 2,
                    "quantity":5
                }
            ]

+ Response 422 (application/json)
    + Body

            { 
                "message": "\"quantity\" must be greater than or equal to 1"
            }

+ Request (application/json)
    + Body

            [
                {
                    "productId": 12,
                    "quantity":1
                },
                {
                    "productId": 2,
                    "quantity":5
                }
            ]

+ Response 404 (application/json)
    + Body

            {
                "message": "Product not found"
            }

#### Atualiza uma venda

```http
  PUT /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Request (application/json)
    + Body

            [
                {
                "productId": 1,
                "quantity":10
                },
                {
                "productId": 2,
                "quantity":50
                }
            ]

+ Response 200 (application/json)
    + Body

            {
                "saleId": 1,
                "itemsUpdated": [
                    {
                        "productId": 1,
                        "quantity":10
                    },
                    {
                        "productId": 2,
                        "quantity":50
                    }
                ]
            }

+ Response 404 (application/json)
    + Body

            {
                "message": "Sale not found"
            }

#### Deleta uma venda

```http
  DELETE /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do produto desejado |

+ Response 204 (application/json)
+ Response 404 (application/json)
    + Body

            {
                "message": "Sale not found"
            }


