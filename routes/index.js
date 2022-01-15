const express = require('express');
const router  = express.Router();
const createDefaultUser = require('../helpers/createDefaultUsers');
const Users = require('../models/users');
const parse = require('../helpers/parser');
const validator = require('../helpers/validator');


// add default users
if(process.env.SEED === 'true'){
    var count = 1;
    ( function createUser(){
      var newUser = createDefaultUser.createUser()
      Users.create(newUser, function(err, result){
          if(err) return console.error(err);
          if(count < 5){
              count++;
              createUser();
          }
      });
  })()
};

// ### PING ###
router.get('/ping', function(req, res, next) {
  res.status(200).send({"ping": "ok"});
});

// ### USERS ###
router.get('/users', function(req, res, next) {
    var query = {};
  
    if(typeof(req.query.firstname) != 'undefined'){
      query.firstname = req.query.firstname
    }
  
    if(typeof(req.query.lastname) != 'undefined'){
      query.lastname = req.query.lastname
    }
  
    Users.getAll(query, function(err, record){
      var users = parse.allUsers(req, record);
  
      if(!users){
        res.status(404).send({error: 'usersNotFoundException', message: 'Nenhum usuário encontrado'});
      } else {
        res.send({'users': users, 'count': users.length});
      }
    })
});

router.post('/users', function(req, res, next) {
  newUser = req.body;

  validator.validateUser(newUser, function (payload, msg){
    if(!msg) {
      Users.create(newUser, function(err, user) {
        if(err) {
          res.status(400);
        } else {
          let record = parse.userWithId(req, user);
          record.id = payload.userWithId
          if(!record){
            res.status(400).send({error: 'bodyNotMakeRightException', message: 'Corpo de envio incorreto'});
          } else {
            res.send(record);
          }
        }
      })
    } else {
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
      res.status(400).send({error: 'bodyNotMakeRightException', message: 'Corpo de envio incorreto', 'errors': errors});
    }
  })

  
});

module.exports = router;