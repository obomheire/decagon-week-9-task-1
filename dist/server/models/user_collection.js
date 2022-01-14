"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
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
            validator: validator_1.default.isEmail,
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
