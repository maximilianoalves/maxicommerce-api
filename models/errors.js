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

exports.productsNotFoundException = function() {
  return {error: 'productsNotFoundException', message: 'Nenhum produto encontrado'}
}

exports.cartNotFoundException = function() {
  return {error: 'cartNotFoundException', message: 'Nenhuma sacola encontrado'}
}

exports.productNotExistAtCartException = function() {
  return {error: 'productNotExistAtCartException', message: 'O produto removido não está na sacola'}
}

exports.userNameAlreadyExistsException = function() {
  return {error: 'userNameAlReadyExistsException', message: 'userName em uso'};
}

exports.productNameAlreadyExistsException = function() {
  return {error: 'productNameAlreadyExistsException', message: 'Nome do produto já está em uso'};
}

exports.userWithoutAuthorization = function() {
  return {error: 'userWithoutAuthorizationException', message: 'Usuário não autenticado'};
}

exports.userIsNotAdmin = function() {
  return {error: 'userIsNotAdminException', message: 'Você precisa de um usuários administrador.'};
}