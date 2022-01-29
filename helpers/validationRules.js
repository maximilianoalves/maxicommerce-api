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