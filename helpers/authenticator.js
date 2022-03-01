let Users = require('../models/users')
let Errors = require('../models/errors')

exports.auth = (req, res, next, callback) => {
    let authHeader = req.headers.authorization

    if(authHeader != null) {
        let auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
        let user = auth[0];
        let pass = auth[1];
    
        Users.findByUserNameAndPass(user, pass, (err, record) => {
            // 0 - user is admin
            // 1 - user is not admin
            if(record) {
                if(record.admin && record.password == pass) {
                    callback(0);
                } else {
                    callback(1);
                }
            } else {
                callback(2);
            }
        })
    } else {
        callback(1);
    }
}

exports.authCart = (req, res, next, callback) => {
    let authHeader = req.headers.authorization

    if(authHeader != null && typeof authHeader != 'undefined') {
        let auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
        let user = auth[0];
        let pass = auth[1];
    
        Users.findByUserNameAndPass(user, pass, (err, record) => {
            // 0 - user exist
            // 1 - user not exist
            if(record) {
                callback({userType: 0, userName: user});
            } else {
                callback({userType: 1, userName: user});
            }
        })
    } else {
        callback({userType: 1, userName: null});
    }
}

exports.authForNewUser = (req, res, next, callback) => {
    let authHeader = req.headers.authorization

    if(authHeader != null) {
        let auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
        let user = auth[0];
        let pass = auth[1];
    
        Users.findByUserNameAndPass(user, pass, (err, record) => {
            // 0 - user is admin
            // 1 - user is not admin
            if(record) {
                if(record.admin && record.password == pass) {
                    callback(0);
                } else {
                    callback(1);
                }
            } else {
                callback(2);
            }
        })
    } else {
        res.status(401).send(Errors.userIsNotAdmin())
    }
}