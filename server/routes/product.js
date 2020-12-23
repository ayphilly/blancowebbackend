var express = require('express');
var router = express.Router();
var product= require('../controller/product')
const dotenv = require('dotenv')
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var URL = "mongodb+srv://blancoweb:blancoweb@blancocluster.gcvo1.mongodb.net/Blanco?retryWrites=true&w=majority";

// Storage
// const uploadn = multer({dest : 'uploads/'})

// const storage = new GridFsStorage({
//     url: URL,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//       });
//     }
// });
  
// const upload = multer({ storage });

// router.post('/create', upload.single('file'), product.create);
router.post('/create', product.create);
router.get('/products',product.find);
router.get('/product/:id',product.findOne);
router.get('/delete/:name',product.deleteProduct);
router.get('/prodLow', product.findHighPrice);
router.get('/prodHigh', product.findLowPrice);
// router.put('/updatebyid', user.updateById)


module.exports = router;