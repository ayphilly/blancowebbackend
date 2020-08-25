(function() {

    var mongoose = require('mongoose');
    var category = mongoose.model('Category');
    
    //create a Category
    exports.createCategory = (data, callback) => {
        category.create(data).then((response)=>{
            callback(null, response);
        }, (error) => {
            callback(error, null);
        })
    }
    
    
    //read Category
    exports.findCategory = (query, callback) => {
        category.findOne(query, callback);
    }
    
    // Update category
    exports.updateCategoryById = (id, data, callback) => {
        category.findByIdAndUpdate(
            {_id : id},
            data, (err, response) => {
                callback(err, response);        
            }
        );
    }
    
    exports.updateCategory = (query, data, callback) => {
        category.findOneAndUpdate(query, data, {new:true}, (err, response) => {
            callback(err, response);
        })
    }
    
    exports.deleteCategory = (query, callback) => {
        category.deleteOne(query, callback)
    }

}) ()


//syntax to wrap all exports in a function
// (function(){
    
// })()
    