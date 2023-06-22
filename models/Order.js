const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Product = require('./Product');
const Schema = mongoose.Schema;

const Order = new Schema({
    _id : ObjectId,
    Quantity : Number,
    Products : [Product],
    Price: Number,
    Date : Date,
    Sniff : String
});

module.exports = mongoose.model('Order', Order);