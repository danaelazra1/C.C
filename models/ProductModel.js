const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {type : ObjectId , auto: true},
    ProductName: String,
    Price : Number,
    NumberOfOrders : Number,
    DateBaked : Date,
    Description : String,
    Picture : String
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = {
    ProductModel,
    ProductSchema
}