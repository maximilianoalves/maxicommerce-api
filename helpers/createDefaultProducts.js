let utils = require('../helpers/utils');


let randomNumber = function(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
};

let randomProductName = () => {
  let productName = ["Lavadoura de roupas Samsung","Celular LG","Camiseta Nike","Nike Jordan Retro 1","Microondas STI","TV 50\' LG"]
  return productName[randomNumber(0,productName.length - 1)];  
};

let randomPrice = (from, to) => {
  return ((Math.random() * (to - from)) + from).toFixed(2);
}


exports.createProduct = () => {

  let randomizedPrice = randomPrice(1, 100)

  let product = {
    name: randomProductName(),
    price: randomizedPrice,
    formmatedPrice: utils.formmatValues(randomizedPrice),
    quantity: randomNumber(0, 25),
  }

  return product;
}