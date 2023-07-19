const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Order = require('./OrderModel');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    _id : {type : ObjectId , ref : 'User'},
    Username : String,
    Name : String,
    phoneNumber : String,
    Address : String,
    Orders : [{type : Order.OrderSchema,ref : 'Order' }],
    },
    {_id : false});

module.exports = mongoose.model('Customer', CustomerSchema);