"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.authenticateToken = exports.joiShemaLog = exports.joiShemaReg = void 0;
const joi_1 = __importDefault(require("joi"));
const jwt = require('jsonwebtoken');
const path_1 = __importDefault(require("path"));
// import {Customer, User }from './interface';
let dbpath = path_1.default.resolve('src/database.json');
let dbpath2 = path_1.default.resolve('src/user.json');
let joiShemaReg = () => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(45).required(),
        email: joi_1.default.string().min(5).max(45).email().required(),
        password: joi_1.default.string().min(5).max(45).required(),
        repeat_password: joi_1.default.ref('password')
    });
    return schema;
};
exports.joiShemaReg = joiShemaReg;
let joiShemaLog = () => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(45).required(),
        password: joi_1.default.string().min(5).max(45).required(),
    });
    return schema;
};
exports.joiShemaLog = joiShemaLog;
let authenticateToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token)
        return res.status(401).redirect('/login');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error)
            return res.status(403).redirect('/login');
        // console.log('user is still logged in')
        // req.user = user
        next();
    });
};
exports.authenticateToken = authenticateToken;
let createToken = (username, res) => {
    const user = { user_name: username };
    //require('crypto').randomBytes(64).toString('hex')
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
    // console.log(accessToken)
    res.cookie('jwtToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 1000 // 1 day
    });
};
exports.createToken = createToken;
