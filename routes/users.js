const express = require('express');
const router  = express.Router();
const createDefaultUser = require('../helpers/createDefaultUsers');
const Users = require('../models/users');
const parse = require('../helpers/parser');
const validator = require('../helpers/validator');
const Errors = require('../models/errors');

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

/**
 * @api {get} Users Get Users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Returns all users that exist within the API. Can take optional query strings to search and return a subset of users.
 *
 * @apiParam {String} [firstname] Return users with a specific firstname
 * @apiParam {String} [lastname]  Return users with a specific lastname
 * 
 * @apiExample Example 1 (All Users):
 * curl --location --request GET 'localhost:3001/users'
 * 
 * @apiExample Example 2 (Filter by name):
 * curl --location --request GET 'localhost:3001/users?firstname=Monica&lastname=Alves
 * 
 * 
 * @apiSuccess {object[]} object Array of objects that contain Users objects
 * @apiSuccess {number} object.id ID of a specific user that matches search criteria
 * @apiSuccess {String} object.firstname Firstname of a specific user.
 * @apiSuccess {String} object.lastname Lastname of a specific user.
 * @apiSuccess {String} object.password Password of a specific user. This field only possible see when you have Basic auth.
 * @apiSuccess {String} object.userName userName of a specific user. Not permitted create same userNames.
 * @apiSuccess {String} object.birthDate birthDate of a specific user.
 * @apiSuccess {String} count Quantity users have.
 * 
 * 
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 OK
 * 
 * {
    "users": [
        {
            "id": 2,
            "firstname": "João",
            "lastname": "Gonçalves",
            "password": "Teste123",
            "userName": "hermioneSilva",
            "birthDate": "1996-02-01"
        },
        {
            "id": 3,
            "firstname": "Hermione",
            "lastname": "Silva",
            "password": "Teste123",
            "userName": "pedroAlves",
            "birthDate": "1996-02-01"
        }
    ],
    "count": 5
} 
*/
// GET
router.get('/', function(req, res, next) {
    let query = {};
    if(typeof(req.query.firstname) != 'undefined'){
      query.firstname = req.query.firstname
    }
    if(typeof(req.query.lastname) != 'undefined'){
      query.lastname = req.query.lastname
    }
    Users.getAll(query, function(err, record){
      let users = parse.allUsers(req, record);
      if(!users){
        res.status(404).send(Errors.userNotFoundException());
      } else {
        res.send({'users': users, 'count': users.length});
      }
    })
});

// GET WITH ID
router.get('/:id',function(req, res, next){
    Users.getById(req.params.id, function(err, record){
      if(record){
        let user = parse.userWithId(req.headers.accept, record);
        if(!user){
          res.sendStatus(418);
        } else {
          res.send(user);
        }
      } else {
        res.sendStatus(404)
      }
    })
});

// POST
router.post('/', function(req, res, next) {
  newUser = req.body;
  Users.findByUserName(newUser.userName, function(err, record) {
    if(!record) {
      validator.validateUser(newUser, function (payload, msg){
        if(!msg) {
          Users.create(newUser, function(err, user) {
            if(err) {
              res.status(400);
            } else {
              let record = parse.userWithId(req, user);
              record.id = payload.userWithId
              if(!record){
                res.status(400).send(Errors.bodyNotMakeRightException());
              } else {
                res.send(record);
              }
            }
          })
        } else {
          let errors = validator.serializeErrosValidateUser(msg)
          res.status(400).send(Errors.bodyNotMakeRightException(errors));
        }
      })
    } else {
      res.status(400).send();
    }
  })
});



module.exports = router;