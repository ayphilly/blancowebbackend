(function() {

var mongoose = require('mongoose');
var user = mongoose.model('User');

//create User
exports.createUser = (data, callback) => {
    user.create(data).then((response)=>{
        callback(null, response);
    }, (error) => {
        callback(error, null);
    })
}

//read user
exports.findUser = (query, callback) => {
    user.findOne(query, callback);
}

// Update user
exports.updateUserById = (id, data, callback) => {
    user.findByIdAndUpdate(
        {_id : id},
        data, (err, response) => {
            callback(err, response);          
        
    });
}

exports.updateUser = (query, data, callback) => {
    user.findOneAndUpdate(query, data, {new:true}, (err, response) => {
        callback(err, response);
    })
}

exports.deleteUser = (query, callback) => {
    user.deleteOne(query, callback)
}
}) ()
