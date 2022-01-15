let rules    = require('../helpers/validationRules'),
  validate = require('validate.js');

  exports.validateUser = function(payload, callback){
    if(payload.firstname){
        payload.firstname = payload.firstname.trim();
    }
    if(payload.lastname){
        payload.lastname = payload.lastname.trim();
    }
  
    callback(payload, validate(payload, rules.returnUserRuleSet()))
  };