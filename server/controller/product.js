var userProduct = require ('../service/product');
var mongoose = require('mongoose');
const productSchema = mongoose.model('Product');
var categorySchema = mongoose.model('Category')
var bcrypt = require('bcrypt');
// const validation = require('../validation/productvalidation');

exports.create = async (req, res, next)=> {
    
    var body = new Product(req);  
    var categoryId = req.body.categoryId;
    
    var query = {       
        name : req.body.name,        
        price: req.body.price,
        image: req.file
    }

    // validation = await regvalidate(body)

    // if (!validation){
    //     res.status(400).send('Some fields are missing.');
    //     return;
    // }
    
    // userProduct.createProduct(query, (error, response)=> {
    //     if (response){
    //         console.log(req.file);
    //         console.log(body);
    //         return res.status(200).send(response);
    //     } else if (error) {
    //         return res.status(400).send('Error creating product');
    //     }
    // })

    productSchema.create(query).then(newProd => {
        console.log(newProd.product_id);
        console.log(newProd._id);
        // console.log(body)
        categorySchema.findOneAndUpdate({category_id : req.body.categoryId}, {
            $push: { products: newProd._id }            
        }, function (err, result) {
            if (err) {return res.send(err)} else {
                console.log(result);
                return res.send(result);
            }
            
        });
        
    }).catch(error => {
        return res.status(400).send(error, 'Error creating product');
    })
        
        
    
}

exports.find = async (req, res)=> { 
   
    await productSchema.find({}).then( result => {
        console.log(result);
        return res.status(200).send(result);
    }).catch(err=> {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.findHighPrice = async (req, res)=> { 
   
    await productSchema.find({}).sort({price:1}).then( result => {
        console.log(result);
        return res.status(200).send(result);
    }).catch(err=> {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.findLowPrice = async (req, res)=> { 
   
    await productSchema.find({}).sort({price:-1}).then( result => {
        console.log(result);
        return res.status(200).send(result);
    }).catch(err=> {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.findOne = async(req, res) => {
    const { id } = req.params;
    console.log(id)
    const query = {
        product_id: id
    }
    await productSchema.findOne(query).then( result => {
        console.log(result);
        console.log(result.image.filename);
        return res.status(200).send(result);
    }).catch(err=> {
        console.log(err);
        res.status(400).send(err + ' errorrr not ffff')
    })
    
}

exports.deleteProduct=(req, res) => {
    var { id } = req.params;
    var query = {
        product_id: id
    };
    if (!query) {
        res.status(400).send(error);
        return;
    }
    productSchema.findOneAndDelete(query).then (result => {
        console.log('deleted');
        res.status(200).send(response);
    }).catch(err=> {
        console.log(error);
        res.status(400).send('Error Deleting Product')
    })
}
 
exports.updateProduct = (req, res) => {
    var body =new Product (req);
    var query = {
        product_id: req.body.product_id
    }
    if (!body){
        res.status(404).send(error);
        return;
    }
    var updateData = body;
    productSchema.findByIdAndUpdate(query, updateData, (error, response)=> {
        if (response){
            res.status(200).send(response);
        }else if (error) {
            res.status(400).send(err);
        }
    })

}

exports.update = (req, res) => {
    
    var query = {
        product_id: req.body.product_id
    };
    var data = new Product(req);

    var query = new Product(body);

    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    productSchema.findOneAndUpdate(query, {new:true}, data).then(result => {
        console.log(result);
        res.status(200).send(result)
    }).catch(
        error=> {
            console.log(error);
            res.status(404).send(error)
        }
    )
}



class Product {
    constructor (product) {
        
        this.name = product.body.name ;
        this.price = product.body.price;
        this.image = product.file;
       
    }
}

