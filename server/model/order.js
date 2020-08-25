const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({
    order_id: Number,
    products:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});



schema.plugin(AutoIncrement, {inc_field: 'order_id'});
const order = mongoose.model('Order', schema);
module.exports = order;