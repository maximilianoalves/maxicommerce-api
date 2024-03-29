let Datastore = require('nedb');
let db = new Datastore();

let Products = require('../models/products')
let Users = require('../models/users')

let utils = require('../helpers/utils')
let carts = new Datastore();


exports.get = (callback) => {
    carts.find({}, (err, cart) => {
        if(err){
            callback(err);
        } else {
            callback(null, cart);
        }
    })  
},
exports.addProductToCart = (payload, username, callback) => {
  Products.getById(payload.id, (err, record) => {
    let productRecord = record

    if(err) {
        callback(err)
    } else {
      this.findByUserName(username, (err, recordCart) => {
        if (recordCart) {
          let cart = recordCart
          let products = cart.products;
          let hasProduct = false;
          let total = cart.total;
          products.forEach((product) => {
            if (product.id == payload.id) {
              product.quantity = payload.quantity;
              total = product.price * product.quantity
              hasProduct = true;
            }
          })
          cart.products = products
          
          if (hasProduct == false) {
            products.push({
              "id": productRecord.productId,
              "name": productRecord.name,
              "price": productRecord.price,
              "formmatedPrice": productRecord.formmatedPrice,
              "quantity": payload.quantity
            });
            total = utils.roundedValues(total + (productRecord.price * payload.quantity))
          }
          cart.totalFormmated = utils.formmatValues(total)
          cart.total = total
          cart.count = cart.count + 1

          carts.update({'userName': username}, { $set: cart }, {}, (err, doc) => {
            if(err){
                callback(err);
            } else {
                callback(null, doc);
            }
          });
        } else {
          let cart = {
            userName: username,
            products: [
              {
                id: productRecord.productId,
                name: productRecord.name,
                price: productRecord.price,
                formmatedPrice: productRecord.formmatedPrice,
                quantity: payload.quantity
              }
            ],
            total: utils.roundedValues(productRecord.price * payload.quantity),
            totalFormmated: utils.formmatValues(utils.roundedValues(productRecord.price * payload.quantity)),
            count: 1
          }
          carts.insert(cart, (err, doc) => {
            if(err){
                callback(err);
            } else {
                callback(null, doc);
            }
          });
        }
      })
    }
  })
},
exports.findByUserName = (name, callback) => {
    carts.findOne({userName: name}, (err, carts) => {
      if(err){
        callback(err, null)
      } else {
        callback(null, carts);
      }
    });
},
exports.delete = (id, username, callback) => {
  this.findByUserName(username, (err, recordCart) => {
    if (recordCart) {
      let cart = recordCart
      let products = recordCart.products
      let total = 0
      let change = false
      products.forEach((product, index) => {
        if (product.id == parseFloat(id)) {
          products.splice(index)
          change = true
        }
      });
      cart.products = products
      cart.products.forEach((product, index) => {
        total = total + (product.price * product.quantity)
      })
      cart.total = utils.roundedValues(total)
      cart.totalFormmated = utils.formmatValues(utils.roundedValues(total))
      // TODO: Validar se não tem somente um produto
      cart.count = cart.products.length
      if(change) {
        carts.update({'userName': username}, { $set: cart }, {}, (err, doc) => {
          if(err){
              callback(err);
          } else {
              callback(null, doc);
          }
        });
      } else {
        callback(err)
      }
    } else {
      callback(err, null)
    }
  })
}