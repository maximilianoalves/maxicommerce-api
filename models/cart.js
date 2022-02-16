let Datastore = require('nedb');
let db = new Datastore();

let Products = require('../models/products')
let Users = require('../models/users')

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
    products.getById(payload.id, (err, record) => {
        if(err) {
            callback(err)
        } else {
            carts.findByUserName(username, (err, recordCart) => {
                if (recordUser) {
                    products = recordCart.products;
                    let hasProduct = false;
                    let total = recordCart.total;
                    products.forEach((product) => {
                        if (product.productId == payload.id) {
                            product.quantity = payload.quantity;
                            total = total + (product.price * product.quantity)
                            hasProduct = true;
                        }
                    })

                    if (!hasProduct) {
                        products.push({
                            "id": record.productId,
                            "name": record.name,
                            "price": record.price,
                            "formmatedPrice": record.formmatedPrice,
                            "quantity": payload.quantity
                        });
                        total = total + (record.price * payload.quantity)
                    }

                    recordCart.total = total
                } else {
                    // TODO: Criar uma sacola e adicionar o produto.
                }
            })
        }
    })
},
exports.findByUserName = (name, callback) => {
    carts.findOne({username: name}, (err, carts) => {
      if(err){
        callback(err, null)
      } else {
        callback(null, carts);
      }
    });
}