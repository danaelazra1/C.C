const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Product = require('./ProductModel');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id : {type : ObjectId , auto: true},
    Quantity : Number,
    Products : [{type : ObjectId, ref : 'Product'}], // make sure delete product wont make error
    Price: Number,
    Date : Date,
    Sniff : String
});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports= {
    OrderModel,
    OrderSchema
}