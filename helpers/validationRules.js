exports.returnUserRuleSet = () => {
  var constraints = {
    firstname : {presence: true},
    lastname : {presence: true},
    password : {presence: true},
    userName: {presence: true},
    admin: {presence: true},
    birthDate: {presence: true}
  };

  return constraints
}

exports.returnAddProductRuleSet = () => {
  var addProductConstraints = {
    id: {presence: true},
    quantity: {presence: true}
  };
  return addProductConstraints
}

exports.returnProductRuleSet = () => {
  var productConstraints = {
    name : {presence: true},
    price : {presence: true},
    quantity : {presence: true}
  };

  return productConstraints
}