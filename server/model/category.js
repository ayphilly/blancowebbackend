const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

const schema = new Schema({
    category_name : {
        String       
    },
    category_id: Number,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }   
    ]

})


schema.plugin(AutoIncrement, {inc_field: 'category_id'});
var category = new mongoose.model('Category', schema);
module.exports = category;