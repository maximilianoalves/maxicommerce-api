exports.allUsers = (req, rawUser) => {
  let payload = [];
  rawUser.forEach((u) => {
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

exports.allUsersWithoutPassword = (req, rawUser) => {
  let payload = [];
  rawUser.forEach((user) => {
    let tmpUser = {
      id: user.userId,
      firstname: user.firstname,
      lastname: user.lastname,
      userName: user.userName,
      birthDate: user.birthDate,
    }
    payload.push(tmpUser);
  });
  return payload;
}

exports.userWithId = (req, rawUser) => {
  try {
    let user = {
      "id" : rawUser.userId,
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

exports.userWithIdWithoutPassword = (req, rawUser) => {
  try {
    let user = {
      "id" : rawUser.userId,
      'firstname' : rawUser.firstname,
      'lastname' : rawUser.lastname,
      'userName': rawUser.userName,
      'birthDate': rawUser.birthDate
    }
    return user
  } catch(err) {
    return err.message;
  }
}

