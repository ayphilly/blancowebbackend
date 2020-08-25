(function () {
    var mongoose = require('mongoose');
    var ProductSchema = mongoose.model('Product');


    exports.createProduct = (data, callback) =>{
        ProductSchema.create(data).then(response=> {
            callback(null, response)
        }, error => {
            callback(error, null)
        })
    }

    exports.findProduct = (callback) => {
        ProductSchema.find({price:2.99},callback)
    }

    exports.findProductOne = (query,callback) => {
        ProductSchema.findOne(query,callback)
    }

    exports.updateProductById = (query, data, callback) => {
        ProductSchema.findByIdAndUpdate(query,data, (error,response) => {
            callback(error, response)
        })
    }
}) ()