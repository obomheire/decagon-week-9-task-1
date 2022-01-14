import validator from 'validator'
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const RegSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true, 
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'message'
    }
  },
  password: {
    type: String,
    minlength: 6, 
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now
  },
  updated_At: {
    type: Date,
    default: Date.now
  },
  refreshToken: String
});

module.exports = mongoose.model('User_collection', RegSchema);
