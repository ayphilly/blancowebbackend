var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

var schema = new Schema({
   product_id: Number,
    name : {
        type: String,
        required: true,
        unique: true
    },    
    price : {
        type: Number,
        required:true

    },
    // image: Schema.Types.Mixed,
    imageUrl : String
}
,{
    timestamps:true
}

)

schema.plugin(AutoIncrement, {inc_field: 'product_id'});
var ProductSchema = mongoose.model('Product', schema);
module.exports = ProductSchema;