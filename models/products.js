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

exports.getById = function(id, callback){
    products.findOne({'productId': parseInt(id)}, function(err, products) {
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

exports.create = function(payload, callback){
    counter++;
    payload.productId = counter;

    payload.formmatedPrice = `R$ ${payload.price}`

    products.insert(payload, function(err, doc) {
      if(err){
          callback(err);
      } else {
          callback(null, payload);
      }
  });
}