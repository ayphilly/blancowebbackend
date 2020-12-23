var mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var Schema = mongoose.Schema;

var schema = new Schema({
    
    firstname: {
        type: String,
        required: true,
        default : ''
    },
    lastname: {
        type: String,
        required: true,
        default: ''
    },
    email : {
        type: String,
        required: true,
        default: ''
    },    
    address : {
        type: String,
        required: false,
        default: ''
    },
    phone: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required:true
    },
    

});

schema.pre('save', function(next) {
    var user = this;

    //only hash if user has been modified
    if (!user.isModified('password'))return next();

    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
    

});

var user = new mongoose.model('User', schema);
module.exports = user;