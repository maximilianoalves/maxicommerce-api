let express = require('express');
let authenticator = require('../helpers/authenticator');

let router  = express.Router();
const Cart = require('../models/cart');
const productsParser = require('../helpers/cartParser');
const validator = require('../helpers/validator');
const Errors = require('../models/errors');


/**
 * @api {get} cart Get cart
 * @apiName GetCart
 * @apiGroup Cart
 * @apiVersion 1.0.0
 * @apiDescription Returns a unique cart that exist within the API.
 *
 *  @apiExample Example 1 ( Cart ):
 * curl -L -X GET 'localhost:3001/cart'
 * 
 * 
 * @apiSuccess {total} All products price result
 * @apiSuccess {object[]} products Array of objects that contain products objects
 * @apiSuccess {number} products.id ID of a specific user that matches search criteria
 * @apiSuccess {String} products.name Product name.
 * @apiSuccess {String} products.price Product price.
 * @apiSuccess {String} products.formmatedPrice Product formmated. 
 * @apiSuccess {String} count Count of products inside cart.
 * 
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 OK
 * 
 * {
 *  "total": "30.87"
 *  "totalFormmated": "R$ 30.87",
 *  "count": 2,
 *  "products": [
 *      {
 *          "id": 1,
 *          "name": "TV 50' LG",
 *          "price": "12.02",
 *          "formmatedPrice": "R$ 12.02",
 *          "quantity": 3
 *      },
 *      {
 *          "id": 2,
 *          "name": "Nike Jordan Retro 1",
 *          "price": "18.85",
 *          "formmatedPrice": "R$ 18.85",
 *          "quantity": 3
 *      }
 *  ]
 *}
*/
//GET
router.get('/', (req, res, next) => {
    // TODO    
});

/**
 * @api {post} cart/add-product/ Add product to cart
 * @apiName AddProductToCart
 * @apiGroup Cart
 * @apiVersion 1.0.0
 * @apiDescription Create and add products to cart
 * 
 * @apiExample JSON example usage:
 * curl -L -X POST 'localhost:3001/cart/add-product' \
 * -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
 * -H 'Content-Type: application/json' \
 * --data-raw '{
    "id": 2,
    "quantity": 12
  }'
 *
 * @apiSuccess {String} message Message of success add product
 * 
 * @apiHeader {string} [Basic Authorization]   Basic authorization header to access the PUT endpoint.
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 200 OK
 * 
 *  {
 *      "message": "Produto adicionado com sucesso"
 *  }
 * 
 * @apiErrorExample
 * HTTP/1.1 400 BAD REQUEST
 *
 * {
 *  "error": "bodyNotMakeRightException",
 *  "message": "Corpo de envio incorreto"
 *  "errors": [
 *    {"id": "Campo id é obrigatório!" },
 *    {"quantity": "Campo quantity é obrigatório!" }
 *  ]
 * }
 * 
 * @apiErrorExample
 * HTTP/1.1 400 BAD REQUEST
 *
 * {
 *  "error": "stockNotFoundException",
 *  "message": "Tivemos problemas com o stock do produto. Tente mais tarde."
 * }
 * 
 * @apiErrorExample
 * HTTP/1.1 404 NOT FOUND
 *
 * {
 *  "error": "productNotFoundException",
 *  "message": "O ID informado não foi encontrado em nossa base de dados"
 * }
*/
// POST
router.post('/add-product/', (req, res, next) => {
    // TODO    
});

/**
 * @api {delete} cart/remove-product/ Remove product to cart
 * @apiName RemoveProductToCart
 * @apiGroup Cart
 * @apiVersion 1.0.0
 * @apiDescription Remove product cart
 * 
 * @apiExample JSON example usage:
 * curl -L -X POST 'localhost:3001/cart/remove-product/2' \
 * -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
 * -H 'Content-Type: application/json' \
 * 
 * @apiSuccess {String} message Message of success remove product
 * 
 * @apiHeader {string} [Basic Authorization]   Basic authorization header to access the PUT endpoint.
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 200 OK
 * 
 *  {
 *      "message": "Produto removido da sacola com sucesso"
 *  }
 * 
 * @apiErrorExample
 * HTTP/1.1 404 NOT FOUND
 *
 * {
 *  "error": "productNotFoundException",
 *  "message": "O ID informado não foi encontrado em nossa base de dados"
 * }
*/
// DELETE
router.delete('/remove-product/:id', (req, res, next) => {
    // TODO    
});