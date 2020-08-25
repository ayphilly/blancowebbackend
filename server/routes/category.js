var express = require('express');
var router = express.Router();
var category = require('../controller/category')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', category.create);
router.get('/getproducts/:id', category.getCatProduct);
// router.delete('/delete', user.delete);
// router.put('/updatebyid', user.updateById);



module.exports = router;