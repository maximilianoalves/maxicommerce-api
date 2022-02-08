let express = require('express');
let authenticator = require('../helpers/authenticator');

let router  = express.Router();
const createDefaultProducts = require('../helpers/createDefaultProducts');
const Products = require('../models/products');
const productsParser = require('../helpers/productsParser');
const validator = require('../helpers/validator');
const Errors = require('../models/errors');

// add default products
if(process.env.SEED === 'true'){
    let count = 1;
    ( function createProducts(){
      let newProduct = {};
      newProduct = createDefaultProducts.createProduct()
      Products.create(newProduct, function(err, result){
          if(err) return console.error(err);
          if(count < 8){
              count++;
              createProducts();
          }
      });
  })()
};

/**
 * @api {get} products Get Products
 * @apiName GetProducts
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Returns all products that exist within the API. Can take optional query strings to search and return a subset of products.
 *
 * @apiParam {String} [name] Return products with contains a specific string
 * 
 *  @apiExample Example 1 (All Products ):
 * curl -L -X GET 'localhost:3001/products'
 * 
 * 
 * @apiExample Example 2 (Filter by name):
 * curl -L -X GET 'localhost:3001/products?name=TV'
 * 
 * @apiSuccess {object[]} object Array of objects that contain Users objects
 * @apiSuccess {number} object.id ID of a specific user that matches search criteria
 * @apiSuccess {String} object.name Product name.
 * @apiSuccess {String} object.price Product price.
 * @apiSuccess {String} object.formmatedPrice Product formmated.
 * @apiSuccess {String} object.quantity Quantity products in stock.
 * @apiSuccess {String} count Quantity products have.
 * 
 * 
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 OK
 * 
 * {
    "products": [
        {
            "id": 1,
            "name": "TV 50' LG",
            "price": "12.02",
            "formmatedPrice": "R$ 12.02",
            "quantity": 23
        },
        {
            "id": 2,
            "name": "Nike Jordan Retro 1",
            "price": "18.85",
            "formmatedPrice": "R$ 18.85",
            "quantity": 16
        }
    ],
    "count": 2
}
*/
//GET
router.get('/', (req, res, next) => {
    let query = {};
    if(typeof(req.query.name) != 'undefined'){
      query.name = req.query.name
    }
    
    Products.getAll(query, (err, record) => {
        let products = productsParser.allProducts(req, record);
        if(!products || products.length < 1){
          res.status(404).send(Errors.productsNotFoundException());
        } else {
          res.status(200).send({'products': products, 'count': products.length});
        }
    })
});

/**
 * @api {get} products Get Products By Id 
 * @apiName GetProductsById
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Returns specific product that exist within the API.
 * 
 *  @apiExample Example 1 (Product by id ):
 * curl -L -X GET 'localhost:3001/products/7'
 * 
 * -H 'Authorization: Basic YWRtaW46YWRtaW4='
 * 
 * @apiSuccess {number} id ID of a specific user that matches search criteria
 * @apiSuccess {String} name Product name.
 * @apiSuccess {String} price Product price.
 * @apiSuccess {String} formmatedPrice Product formmated.
 * @apiSuccess {String} quantity Quantity products in stock.
 * 
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 OK
 * 
 * {
    "id": 7,
    "name": "Nike Jordan Retro 1",
    "price": "81.92",
    "formmatedPrice": "R$ 81.92",
    "quantity": 19
}
* @apiErrorExample
* HTTP/1.1 404 NOT FOUND
*
* {
    "error": "usersNotFoundException",
    "message": "Nenhum produto encontrado"
}
*/
// GET BY ID
router.get('/:id',function(req, res, next){
  Products.getById(req.params.id, function(err, record){
    if(record){
      let product = productsParser.productsWithId(req.headers.accept, record);
      if(!product){
        res.status(418);
      } else {
        res.send(product);
      }
    } else {
      res.status(404).send(Errors.productsNotFoundException());
    }
  });
});

/**
 * @api {post} products Post Create Product
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Creates a new product in the API
 * 
 * @apiParam (Request body) {String}  name               name for the product
 * @apiParam (Request body) {String}  price              price for the product
 * @apiParam (Request body) {String}  quantity           quantity of stock
 * 
 * 
 * @apiExample JSON example usage:
 * curl -L -X POST 'localhost:3001/products' \
 * -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
 * -H 'Content-Type: application/json' \
 * --data-raw '{
    "name": "Bola da nike",
    "price": 11.20,
    "quantity": 12
  }'
 *
 * @apiSuccess (Created 201) {number} id ID of a specific product that matches search criteria
 * @apiSuccess (Created 201) {String} name Name of a specific product.
 * @apiSuccess (Created 201) {String} price Price of a specific product.
 * @apiSuccess (Created 201) {String} formmatedPrice Formmated price of a specific product.
 * @apiSuccess (Created 201) {String} quantity Quantity of stock of product.
 * 
 * @apiHeader {string} [Basic Authorization]   Basic authorization header to access the PUT endpoint.
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 201 CREATED
 * 
 *  {
    "id": 10,
    "name": "Bola da nikee",
    "price": 11.2,
    "formmatedPrice": "R$ 11.2",
    "quantity": 12
}
* @apiError {String} error Exception of error occured
* @apiError {String} message Message of error.
* @apiError {object[]} object Array of objects that contain objects errors/validations of fields.
* @apiError {String} object.name Error when don't have name in the request body.
* @apiError {String} object.price Error when don't have price in the request body.
* @apiError {String} object.quantity Error when don't have quantity in the request body.
*
* @apiErrorExample
* HTTP/1.1 400 BAD REQUEST
*
* {
    error: 'bodyNotMakeRightException',
    message: 'Corpo de envio incorreto'
    errors: [
      {name: 'Campo name é obrigatório!' },
      {price: 'Campo price é obrigatório!' },
      {quantity: 'Campo quantity é obrigatório!' }
    ]
  }
*/
// POST
router.post('/', (req, res, next) => {
  newProduct = req.body;
  authenticator.authForNewUser(req, res, next, (userStatus) => {
    // is admin
    if (userStatus == 0) {
      Products.findByName(newProduct.name, function(err, record) {
        if(!record) {
          validator.validateProduct(newProduct, function (payload, msg){
            if(!msg) {
              Products.create(newProduct, function(err, product) {
                if(err) {
                  res.status(400);
                } else {
                  let record = productsParser.productsWithId(req, product);
                  if(!record){
                    res.status(400).send(Errors.bodyNotMakeRightException());
                  } else {
                    res.status(201).send(record);
                  }
                }
              })
            } else {
              let errors = validator.serializeErrosValidateProduct(msg)
              res.status(400).send(Errors.bodyNotMakeRightException(errors));
            }
          })
        } else {
          res.status(400).send(Errors.productNameAlreadyExistsException());
        }
      });
    } else {
      res.status(401).send(Errors.userIsNotAdmin())
    }
  });
});

/**
 * @api {put} products/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Updates a current product
 * 
 * @apiParam (Url Parameter) {Number} id                    ID for the user you want to update
 * @apiParam (Request body) {String}  name               name for the product
 * @apiParam (Request body) {String}  price              price for the product
 * @apiParam (Request body) {String}  quantity           quantity of stock
 * 
 * @apiHeader {string} [Basic Authorization]   Basic authorization header to access the PUT endpoint.
 * 
 * @apiExample JSON example usage:
 * curl -L -X PUT 'localhost:3001/products/2' \
 * -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
 * -H 'Content-Type: application/json' \
 * --data-raw '{
    "name": "Bola nike",
    "price": 11.20,
    "quantity": 12
}'
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 200 OK
 * {
    "id": 2,
    "name": "Bola nike",
    "price": 11.2,
    "formmatedPrice": "R$ 11.2",
    "quantity": 12
}
*
* @apiError {String} error Exception of error occured
* @apiError {String} message Message of error.
* @apiError {object[]} object Array of objects that contain objects errors/validations of fields.
* @apiError {String} object.name Error when don't have name in the request body.
* @apiError {String} object.price Error when don't have price in the request body.
* @apiError {String} object.quantity Error when don't have quantity in the request body. 
* @apiErrorExample
*
* HTTP/1.1 400 BAD REQUEST
*
* {
    "error": "bodyNotMakeRightException",
    "message": "Corpo de envio incorreto"
    errors: [
      {name: 'Campo name é obrigatório!' },
      {price: 'Campo price é obrigatório!' },
      {quantity: 'Campo quantity é obrigatório!' }
    ]
  }
*
* @apiErrorExample
* HTTP/1.1 400 BAD REQUEST
*
{
    "error": "productNameAlReadyExistsException",
    "message": "Nome do produto já está em uso"
}
 * */
// PUT
router.put('/:id', (req, res, next) => {
  authenticator.authForNewUser(req, res, next, (userStatus) => {
    // is admin
    if (userStatus == 0) {
      updateProduct = req.body;
      Products.findByName(updateProduct.name, (err, record) => {
        if(!record) {
          validator.validateProduct(updateProduct, (payload, msg) => {
            if(!msg) {
              Products.update(req.params.id, updateProduct, (err) => {
                Products.getById(req.params.id, (err, record) => {
                  if(record) {
                    let product = productsParser.productsWithId(req.headers.accept, record);
                    if(!product){
                      res.sendStatus(418);
                    } else {
                      res.send(product);
                    }
                  }
                });
              });
            } else {
              let errors = validator.serializeErrosValidateProduct(msg)
              res.status(400).send(Errors.bodyNotMakeRightException(errors));
            }
          })
        } else {
          res.status(400).send(Errors.productNameAlreadyExistsException());
        }
      })
      } else {
        res.status(401).send(Errors.userIsNotAdmin())
      }
  });
});

/**
 * @api {delete} products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiVersion 1.0.0
 * @apiDescription Delete a current product
 * 
 * @apiParam (Url Parameter) {Number} id                    ID for the user you want to delete
 * 
 * @apiHeader {string} [Basic Authorization]   Basic authorization header to access the DELETE endpoint.
 * 
 * @apiExample JSON example usage:
 * curl -L -X DELETE 'localhost:3001/products/2' \
 * -H 'Authorization: Basic YWRtaW46YWRtaW4='
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 200 OK
 * {
    "message": "Produto 2 excluído com sucesso"
}
*
*/
//DELETE
router.delete('/:id', (req, res, next) => {
  authenticator.authForNewUser(req, res, next, (userStatus) => {
    // is admin
    if (userStatus == 0) {
      Products.delete(req.params.id, (err) => {
        if (!err) {
          res.status(200).send({message: `Produto ${req.params.id} excluído com sucesso`})
        } else {
          res.status(404).send(Errors.productsNotFoundException())
        }
      })
    } else {
      res.status(401).send(Errors.userIsNotAdmin())
    }
  });
});

module.exports = router;