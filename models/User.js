const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  _id : ObjectId,
  Username : {type : String, unique : true , required : true},
  Password : {type : String , required : true},
  isAdmin : {type:Boolean,
            default: false
            }
});

module.exports = mongoose.model('User', User);