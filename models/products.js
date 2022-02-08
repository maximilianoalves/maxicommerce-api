let Datastore = require('nedb');
let db = new Datastore();
let counter = 0;

let products = new Datastore();

exports.getAll = (query, callback) => {
    if (Object.keys(query).length > 0) {
        let name = query.name
        products.find({}, (err, products) => {
            containingProducts = []
            products.forEach(element => {
                searcher = element.name.toLowerCase()
                if (searcher.includes(name.toLowerCase())) {
                    containingProducts.push(element)
                }
            });
            if(err){
                callback(err);
            } else {
                callback(null, containingProducts);
            }
        })
    } else {
        products.find({}, (err, products) => {
            if(err){
                callback(err);
            } else {
                callback(null, products);
            }
        })
    }  
},
exports.getById = (id, callback) => {
    products.findOne({'productId': parseInt(id)}, (err, products) => {
      if(err){
        callback(err, null)
      } else {
        callback(null, products);
      }
    });
},
exports.findByName = (name, callback) => {
    products.findOne({name: name}, (err, products) => {
      if(err){
        callback(err, null)
      } else {
        callback(null, products);
      }
    });
},
exports.create = (payload, callback) => {
    counter++;
    payload.productId = counter;
    payload.formmatedPrice = `R$ ${payload.price}`

    products.insert(payload, (err, doc) => {
      if(err){
          callback(err);
      } else {
          callback(null, payload);
      }
  });
},
exports.update = (id, updateProduct, callback) => {

    updateProduct.formmatedPrice = `R$ ${updateProduct.price}`

    products.update({'productId': parseInt(id)}, { $set: updateProduct }, {}, (err) => {
        if(err){
            callback(err);
        } else {
            callback(null);
        }
    });
},
exports.delete = (id, callback) => {
    products.remove({'productId': parseInt(id)}, (err, record) => {
        if(err){
            callback(err);
        } else {
            callback(null);
        }
    });
}