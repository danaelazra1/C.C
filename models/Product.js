const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    _id: ObjectId,
    productName: String,
    Price : Number,
    NumberOfOrders : Number,
    dateBaked : Date,
    Picture : String
});

module.exports = mongoose.model('Product', Product);