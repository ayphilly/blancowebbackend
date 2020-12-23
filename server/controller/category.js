const { Mongoose } = require("mongoose");

var mongoose = require('mongoose')
var category = mongoose.model('Category')
var categoryService = require('../service/category');

exports.create = (req, res) => {
    var body = req.body;
    var data = new Category(body);
    
    if (!body){
        return res.status(400).send('No data available');
    }

    categoryService.createCategory(data, (error, response)=> {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        }
        if (response ) {
            console.log(response)
            res.status(200).send(response)
        }
    })

}

exports.getCatProduct = (req, res) => {
    var {id} = req.params;

    category.findOne({category_id: id}).populate("products").then (response => {
        console.log(response);
        res.status(200).send(response);
    }).catch( error => {
        res.status(404).send(error);
    })
}

exports.getCatProductLow = async (req, res) => {
    var {id} = req.params;

    await category.findOne({category_id: id}).populate({ path : "products" , options: { sort: { price: 1 }} }).then(response => {
        console.log(response);
        res.status(200).send(response);
    }).catch( error => {
        res.status(404).send(error);
    })
}

exports.getCatProductHigh = async (req, res) => {
    var {id} = req.params;

    await category.findOne({category_id: id}).populate({path: "products" , options: { sort: { price: -1 }} }).then(response => {
        console.log(response);
        res.status(200).send(response);
    }).catch( error => {
        res.status(404).send(error);
    })
}

exports.find = (req, res) => {
    category.find({}).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(400).send(error)
    })
}

exports.ProductCat = async (req, res) => {
    const {id} = req.params;

    var query = {
        product_id : id
    }

    const category = await Category.findId(query).populate('products')
    res.status(200).send(category);
}

class Category {

    Category (body){
        this.name =body.name
    }
}