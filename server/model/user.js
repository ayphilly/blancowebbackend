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

    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
    

});

var user = new mongoose.model('User', schema);
module.exports = user;