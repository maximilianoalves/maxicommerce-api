const js2xmlparser = require("js2xmlparser");

exports.allUsers = function(req, rawUser){
    let payload = [];
  
    rawUser.forEach(function(u){
      let tmpUser = {
        firstname: u.firstname,
        lastname: u.lastname,
        password: u.password,
        userName: u.userName,
        birthDate: u.birthDate,
      }
  
      payload.push(tmpUser);
    });
  
    return payload;
  }


