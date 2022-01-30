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

//GET
router.get('/', function(req, res, next) {
    let query = {};
    if(typeof(req.query.name) != 'undefined'){
      query.name = req.query.name
    }
    
    Products.getAll(query, (err, record) => {
        let products = productsParser.allProducts(req, record);
        if(!products){
          res.status(404).send(Errors.productsNotFoundException());
        } else {
          res.status(200).send({'products': products, 'count': products.length});
        }
    })
});

module.exports = router;