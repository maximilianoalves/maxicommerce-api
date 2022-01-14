var express = require('express');
var router  = express.Router();
const createDefaultUser = require('../helpers/createDefaultUsers');
const Users = require('../models/users');
const parse = require('../helpers/parser');

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

router.get('/ping', function(req, res, next) {
    res.status(200).send({"ping": "ok"});
});


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

module.exports = router;