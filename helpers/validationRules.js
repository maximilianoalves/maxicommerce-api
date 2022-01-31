exports.returnUserRuleSet = function(){
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

exports.returnProductRuleSet = function(){
  var productConstraints = {
    name : {presence: true},
    price : {presence: true},
    quantity : {presence: true}
  };

  return productConstraints
}