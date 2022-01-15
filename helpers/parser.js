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
      'firstname' : rawUser.firstname,
      'lastname' : rawUser.lastname,
      'password' : rawUser.password,
      'userName': rawUser.userName,
      'birthDate': rawUser.birthDate
    }
  
    let payload = {
      "id" : rawUser.id,
      "user" : user
    }
  
    switch(req.headers.accept){
      case 'application/json':
        return payload;
        break;
      case '*/*':
        return payload;
        break;
      default:
        return null;
    }
  } catch(err) {
    return err.message;
  }
}

