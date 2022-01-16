const js2xmlparser = require("js2xmlparser");

exports.allUsers = function(req, rawUser){
  let payload = [];

  rawUser.forEach(function(u){
    let tmpUser = {
      id: u.userId,
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

exports.userWithId = function(req, rawUser){
  try {
    let user = {
      "id" : rawUser.id,
      'firstname' : rawUser.firstname,
      'lastname' : rawUser.lastname,
      'password' : rawUser.password,
      'userName': rawUser.userName,
      'birthDate': rawUser.birthDate
    }
  
    return user
  } catch(err) {
    return err.message;
  }
}

