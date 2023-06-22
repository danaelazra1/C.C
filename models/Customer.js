const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Order = require('./Order');
const Schema = mongoose.Schema;

const Customer = new Schema({
    _id : {type : ObjectId , ref : 'User'},
    Username : String,
    Name : String,
    phoneNumber : String,
    Address : String,
    Orders : [{type : Order,ref : 'Order' }],
    

},{_id : false});

module.exports = mongoose.model('Customer', Customer);