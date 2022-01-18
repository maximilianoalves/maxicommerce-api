exports.bodyNotMakeRightException = function(errors) {
  if(!errors) {
      return {error: 'bodyNotMakeRightException', message: 'Corpo de envio incorreto'};
  } else {
      return {error: 'bodyNotMakeRightException', message: 'Corpo de envio incorreto', 'errors': errors}
  }  
}

exports.notAuthorizedException = () => {
  return {error: 'notAuthorizedException', message: 'Você não tem permissão para alterar um usuário'}
}

exports.userNotFoundException = function() {
  return {error: 'usersNotFoundException', message: 'Nenhum usuário encontrado'}
}

exports.userNameAlreadyExistsException = function() {
  return {error: 'userNameAlReadyExistsException', message: 'userName em uso'};
}