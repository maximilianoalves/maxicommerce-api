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
}

exports.validateProduct = function(payload, callback){
  callback(payload, validate(payload, rules.returnProductRuleSet()))
}

exports.validateAddProduct = function(payload, callback){
  callback(payload, validate(payload, rules.returnAddProductRuleSet()))
}

exports.serializeErrosValidateUser = function(msg) {
  let errors = [];
  if (msg.firstname) {
    errors.push({firstname: 'Campo firstname é obrigatório!' });
  }
  if (msg.lastname) {
    errors.push({lastname: 'Campo lastname é obrigatório!' });
  }
  if (msg.password) {
    errors.push({password: 'Campo password é obrigatório!' });
  }
  if (msg.userName) {
    errors.push({userName: 'Campo userName é obrigatório!' });
  }
  if (msg.birthDate) {
    errors.push({birthDate: 'Campo birthDate é obrigatório!' });
  }
  return errors;
}

exports.serializeErrosValidateProduct = function(msg) {
  let errors = [];
  if (msg.name) {
    errors.push({name: 'Campo name é obrigatório!' });
  }
  if (msg.price) {
    errors.push({price: 'Campo price é obrigatório!' });
  }
  if (msg.quantity) {
    errors.push({quantity: 'Campo quantity é obrigatório!' });
  }
  return errors;
}

exports.serializeErrosValidateAddProduct = function(msg) {
  let errors = [];
  if (msg.id) {
    errors.push({id: 'Campo id é obrigatório!' });
  }
  if (msg.quantity) {
    errors.push({quantity: 'Campo quantity é obrigatório!' });
  }
  return errors;
}