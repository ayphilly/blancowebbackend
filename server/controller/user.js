var userService = require ('../service/user');
var mongoose = require('mongoose');
var user = mongoose.model('User');
var {userValidation} = require('../validation/uservalidation');
var bcrypt = require('bcrypt');

exports.create = async (req, res, next)=> {
   
    var body = new User(req.body);
    // var body = req.body;
    console.log(body);

    validation = await userValidation(body)

    if (!validation){
        res.status(400).json({error : validation.message});
        return;
    }
    else {
        var query = {
            email: body.email
        }

        const checkUserExist = await user.findOne(query);

        if (checkUserExist) {
            return res.status(400).send('User already exists');                     
        } else {            
            userService.createUser(body, (error, response)=> {
                if (response){
                    return res.status(200).send(response);
                } else if (error) {
                    return res.status(400).send('Error creating user');
                }
            })
        }
        
    }
}

exports.find = (req, res)=> {
    const email = req.param('email');
    const password = req.param('password')
    
    var query = {
        email : email
    }
    console.log(password);
    console.log(query);
    // var empty = query.isEmpty();
    if (!query){
        res.status(400).send({message: "Query cannot be empty"});
        console.log('not given')
        return;
    }

    userService.findUser (query, (error, response)=>{
        
        if (response){
            console.log(response);
            bcrypt.compare(password, response.password, function (err, result) {
                
                if (result) {
                    
                    // console.log('Welcome back '. response.firstname)                    
                    return res.status(200).send({message : " it worked "});
                } else {
                    return res.status(400).send({message : "password didn't match "});
                }
            });
               
                     
        } else {
            return res.status(500).json({'message': error});
        }
        
    })
}
exports.updateById= (req, res) => {
    var body = req.body;
    if (!body.id){
        res.status(400).send({message : " ID not provided, please provide ID"});
        return;
    }
    var updateData = new User (body);
    updateData.password = bcrypt.hashSync(updateData.password, 10);
    console.log(updateData.password);
    userService.updateUserById(body.id, updateData, (error, response)=> {
        if (response){
            res.status(200).send(response);
        }else if (error) {
            res.status(500).send(error);
        }
    })

}

exports.update = (req, res) => {
    var body = req.body;
    var query = body.email;
    

    var data = new User(body);

    if (!query) {
        res.status(400).send({message : "Email not provided, please provide email address"});
        return;
    }
    userService.updateUser(query, data, (error, response )=> {
        if (response){
            res.status(200).send(response);
        }else if (error) {
            res.status(500).send(error);
        }
    });
}

exports.delete=(req, res) => {
    var body = req.body || {};
    var query = body.query;
    if (!query) {
        res.status(400).send(error);
        return;
    }
    userService.deleteUser(query, (error, response)=> {
        if (error) {
            res.status(400).send(error);
        }

        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(body);
            } 
            if ( response.n === 0 && response.ok === 1 ) {
                res.status(204).send({
                    message : 'No Data Found'
                });
            }
        }
    })
}

class User {
    constructor (userData) {
        
        this.firstname = userData.firstname ;
        this.lastname = userData.lastname;
        this.email = userData.email;
        this.address = userData.address;
        this.phone = userData.phone;
        this.password = userData.password;
    }
}


