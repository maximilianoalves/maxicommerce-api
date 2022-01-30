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

exports.create = function(payload, callback){
    counter++;
    payload.productId = counter;
    products.insert(payload, function(err, doc) {
      if(err){
          callback(err);
      } else {
          callback(null, payload);
      }
  });
}