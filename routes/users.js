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
 * @api {get} users Get Users
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

/**
 * @api {get} users Get User By Id 
 * @apiName GetUserById
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Returns specific user that exist within the API.
 * 
 * @apiExample Example 1 (Get User by ID):
 * curl --location --request GET 'localhost:3001/users/1'
 * 
 * @apiSuccess {number} id ID of a specific user that matches search criteria
 * @apiSuccess {String} firstname Firstname of a specific user.
 * @apiSuccess {String} lastname Lastname of a specific user.
 * @apiSuccess {String} password Password of a specific user. This field only possible see when you have Basic auth.
 * @apiSuccess {String} userName userName of a specific user. Not permitted create same userNames.
 * @apiSuccess {String} birthDate birthDate of a specific user.
 * 
 * @apiSuccessExample {json} Response:
 * HTTP/1.1 200 OK
 * 
 * {
    "firstname": "Hermione",
    "lastname": "Alves",
    "password": "Teste123",
    "userName": "hermioneSilva",
    "birthDate": "1996-02-01"
}
* @apiErrorExample
* HTTP/1.1 404 NOT FOUND
*
* {
    "error": "usersNotFoundException",
    "message": "Nenhum usuário encontrado"
}
*/
// GET WITH ID
router.get('/:id',function(req, res, next){
    Users.getById(req.params.id, function(err, record){
      if(record){
        let user = parse.userWithId(req.headers.accept, record);
        if(!user){
          res.status(418);
        } else {
          res.send(user);
        }
      } else {
        res.status(404).send(Errors.userNotFoundException());
      }
    })
});

/**
 * @api {post} users Post Create User
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Creates a new user in the API
 * 
 * @apiParam (Request body) {String}  firstname             Firstname for the user
 * @apiParam (Request body) {String}  lastname              Lastname for the user
 * @apiParam (Request body) {String}  password              Password for finish purchases
 * @apiParam (Request body) {String}  userName              UserName for finish purchases
 * @apiParam (Request body) {Date}    birthDate             Date when is your bithday
 * 
 * @apiHeader {string} Content-Type=application/json Sets the format of payload you are sending.
 * @apiHeader {string} Accept=application/json Sets what format the response body is returned in.
 * 
 * @apiExample JSON example usage:
 * curl --location --request POST 'localhost:3001/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstname": "Ana",
    "lastname": "Silva",
    "password": "Ronaldo",
    "userName": "maxsilvaa",
    "birthDate": "1991-12-14"
}'
 *
 * @apiSuccess {number} id ID of a specific user that matches search criteria
 * @apiSuccess {String} firstname Firstname of a specific user.
 * @apiSuccess {String} lastname Lastname of a specific user.
 * @apiSuccess {String} password Password of a specific user. This field only possible see when you have Basic auth.
 * @apiSuccess {String} userName userName of a specific user. Not permitted create same userNames.
 * @apiSuccess {String} birthDate birthDate of a specific user.
 * 
 * @apiSuccessExample {json} JSON Response:
 * HTTP/1.1 200 OK
 * 
 *  {
    "firstname": "Hermione",
    "lastname": "Alves",
    "password": "Teste123",
    "userName": "hermioneSilva",
    "birthDate": "1996-02-01"
}
* @apiError {String} error Exception of error occured
* @apiError {String} message Message of error.
* @apiError {object[]} object Array of objects that contain objects errors/validations of fields.
* @apiError {String} object.firstname Error when don't have firstname in the request body.
* @apiError {String} object.lastname Error when don't have lastname in the request body.
* @apiError {String} object.password Error when don't have password in the request body.
* @apiError {String} object.userName Error when don't have userName in the request body.
* @apiError {String} object.birthDate Error when don't have birthDate in the request body.

* @apiErrorExample
* HTTP/1.1 400 BAD REQUEST
*
* {
    error: 'bodyNotMakeRightException',
    message: 'Corpo de envio incorreto'
    errors: [
      {firstname: 'Campo firstname é obrigatório!' },
      {lastname: 'Campo lastname é obrigatório!' },
      {password: 'Campo password é obrigatório!' },
      {userName: 'Campo userName é obrigatório!' },
      {birthDate: 'Campo birthDate é obrigatório!' }
    ]
  }
*/
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