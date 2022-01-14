var dateFormat = require("dateFormat");


var randomiseNumber = function(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
};

var randomiseFirstName = function(){
  var name = ["João","Paulo","Ana","Monica","Hermione","Pedro"]

  return name[randomiseNumber(0,name.length - 1)];  
};

var randomiseLastName = function(){
  var surname = ["Alves","Silva","Pereira","Santos","Souto","Gonçalves"]

  return surname[randomiseNumber(0,surname.length - 1)];  
};

exports.createUser = function(){
  var birth = new Date(1996, 1, 1);


  var user = {
    firstname: randomiseFirstName(),
    lastname: randomiseLastName(),
    password: 'Teste123',
    userName: randomiseFirstName().toLocaleLowerCase()+randomiseLastName(),
    birthDate: dateFormat(birth.setHours(15,0,0,0), "yyyy-mm-dd"),
  }

  return user;
}