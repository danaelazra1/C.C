const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    _id : {type : ObjectId , auto: true},
    CustomerID : { type: ObjectId, ref : 'Customer'},
    Products : [{type : ObjectId, ref : 'Product'}],
    Price : {type :'Number' , defualt: 0}
    
});

module.exports = mongoose.model('Cart', CartSchema);