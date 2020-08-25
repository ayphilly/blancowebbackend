const Joi = require('@hapi/joi'); 


module.exports.userValidation = (data)=> {
    const schema = Joi.object({
        firstname : Joi.string()             
                    .required(),
        lastname : Joi.string()             
                   .required(),
        email : Joi.string()
                .required()
                .email(),  
        phone : Joi.string()
                .required(),
        address: Joi.string()
                 .alphanum(),
        password: Joi.string()
                    .alphanum()
                    .min(6)
                    .required()
                
    });
    return schema.validate(data);
}

module.exports.Login= (data)=> {
        const schema = Joi.object({
                email: Joi.string().required().email(),
                password: Joi.string().alphanum().required()                     
        });
        return schema.validate(data);
}
