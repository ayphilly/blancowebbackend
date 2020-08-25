var express = require('express');
var router = express.Router();
var user= require('../controller/user')
const Joi = require('@hapi/joi'); 
var { Login} = require('../validation/uservalidation');


//myMiddleWare
const middleware = () => {
  return (req, res, next)=> {
    const email = req.param('email');
    const password = req.param('password')
    
    var data = {
        email : email,
        password : password
    }
    const {error} = Login(data);
    const valid = error == null;

    if (valid) {
      next();
    }else {

      const {details} = error;
      const message = details.map(i => i.message).join(',');

      console.log("error", message);
      res.status(422).json({error: message});

    }

  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', user.create);
router.get('/login',middleware(), user.find);
router.put('/updatebyid', user.updateById);
router.put('/update', user.update);
router.delete('/delete', user.delete);

module.exports = router;

