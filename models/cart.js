let Datastore = require('nedb');
let db = new Datastore();

let products = require('../models/products')

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
            // TODO: Lançar exception informando que o produto não está cadastrado na bas.
        } else {
            // TODO: Fazer a busca por usuário.
            // TODO: Se houver uma sacola para o usuário adicionar o produto dentro do array de produtos.
        }
    })
}