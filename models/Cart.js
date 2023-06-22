const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Product = require('./Product');
const Schema = mongoose.Schema;

const Cart = new Schema({
    _id : ObjectId,
    CustomerID : {Type: ObjectId, ref : 'Customer'},
    Products : [Product],
    Price : Number
    
});

module.exports = mongoose.model('Cart', Cart);