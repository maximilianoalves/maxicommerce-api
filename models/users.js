var Datastore = require('nedb');
var db = new Datastore();
var counter = 0;

var users = new Datastore();

exports.getIDs = function(query, callback){
    users.find(query, function(err, ids){
        if(err){
            callback(err);
        } else {
            callback(null, ids);
        }
    });
},

exports.getAll = function(query, callback) {
    users.find(query, function(err, users){
        if(err){
            callback(err);
        } else {
            callback(null, users);
        }
    })
},

exports.get = function(id, callback){
    users.findOne({'userId': parseInt(id)}, function(err, users) {
      if(err){
        callback(err, null)
      } else {
        callback(null, users);
      }
    });
  },

exports.create = function(payload, callback){
    counter++;
    payload.userId = counter;
    users.insert(payload, function(err, doc) {
        if(err){
            callback(err);
        } else {
            callback(null, payload);
        }
    });
},

exports.update = function(id, updatedUser, callback){
    users.update({'userId': parseInt(id)}, { $set: updatedUser }, {}, function(err){
        if(err){
            callback(err);
        } else {
            callback(null);
        }
    });
},
  
exports.delete = function(id, callback){
    users.remove({'userId': parseInt(id)}, function(err){
        if(err){
            callback(err);
        } else {
            callback(null);
        }
    });
},
  
exports.deleteAll = function(callback){
    counter = 0;
    
    users.remove({}, function(err){
        callback();
    });
}