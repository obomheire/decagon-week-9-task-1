"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.userSignUp = exports.deleteRecipe = exports.updateRecipe = exports.submitRecipe = exports.getRecipeById = exports.getRecipes = void 0;
require('../models/database');
const User_collection = require('../models/user_collection');
const Recipe_collection = require('../models/recipe_collection');
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const modules_1 = require("../models/modules");
let getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = Number(req.query.page);
        let size = Number(req.query.size);
        if (!page)
            page = 1;
        if (!size)
            size = 5;
        const limit = size;
        const skip = (page - 1) * size;
        const recipes = yield Recipe_collection.find().limit(limit).skip(skip);
        res.status(200).send(recipes);
    }
    catch (error) {
        res.status(500).send({ message: error || 'Error Occured' });
    }
});
exports.getRecipes = getRecipes;
let getRecipeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.recipeId)
        return res.status(404).json({ message: 'ID parameter is requred' });
    try {
        // console.log(req.params.recipeId);
        const recipeById = yield Recipe_collection.findById(req.params.recipeId);
        if (!recipeById)
            return res.status(204).json({ 'Message': `No recipe matches ID ${req.params.recipeId}` });
        res.status(200).send(recipeById);
    }
    catch (error) {
        // res.status(500).send({message: error.message || "Error Occured" });
        console.log(error.message);
    }
});
exports.getRecipeById = getRecipeById;
let submitRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // const newRecipe = new Recipe_collection(req.body)
        // res.json(req.body.ingredients)
        const newRecipe = new Recipe_collection({
            title: req.body.title,
            meal_type: req.body.meal_type,
            difficulty_level: req.body.difficulty_level,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation
        });
        yield newRecipe.save();
        res.json(newRecipe).status(200);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.submitRecipe = submitRecipe;
let updateRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.recipeId)
        return res.status(404).json({ message: 'ID parameter is requred' });
    try {
        const editRecipe = yield Recipe_collection.findOne({ _id: req.params.recipeId }).exec();
        if (!editRecipe)
            return res.status(204).json({ 'Message': `No recipe matches ID ${req.params.recipeId}` });
        editRecipe.title = req.body.title;
        editRecipe.meal_type = req.body.meal_type;
        editRecipe.difficulty_level = req.body.difficulty_level;
        editRecipe.ingredients = req.body.ingredients;
        editRecipe.preparation = req.body.preparation;
        yield editRecipe.save();
        res.json(editRecipe);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.updateRecipe = updateRecipe;
let deleteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.recipeId)
        return res.status(404).json({ message: 'ID parameter is requred' });
    try {
        const removeRecipe = yield Recipe_collection.deleteOne({ _id: req.params.recipeId });
        if (!removeRecipe)
            return res.status(204).json({ 'Message': `No recipe matches ID ${req.params.recipeId}` });
        res.json(removeRecipe);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deleteRecipe = deleteRecipe;
let userSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fullName, email, password } = req.body;
        const result = (0, modules_1.joiShemaReg)().validate({ fullName: fullName, email: email, password: password });
        if (result.error) {
            res.send({ error: result.error.details[0].message });
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashed = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield User_collection.create({
                fullName: fullName,
                email: email,
                password: hashed
            });
            // await newUser.save();
            res.json(newUser);
        }
    }
    catch (error) {
        res.send({ 'Error': error.message });
        // console.log(error)
    }
});
exports.userSignUp = userSignUp;
let userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const result = (0, modules_1.joiShemaLog)().validate({ email: email, password: password });
        if (result.error) {
            res.send({ error: result.error.details[0].message });
        }
        else {
            const loginUser = yield User_collection.findOne({ email: email }).exec();
            if (!loginUser) {
                res.json({ Message: 'User not Found' });
            }
            else {
                const validatePassword = yield bcrypt_1.default.compare(password, loginUser.password);
                if (!validatePassword)
                    res.send({ Message: 'incorrect_login' });
                else {
                    (0, modules_1.createToken)(email, loginUser, res);
                    res.status(200);
                }
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userLogin = userLogin;
let userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwtToken');
        res.send({ message: "User sucesssfuly logout" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userLogout = userLogout;
/*
      */
// async function insertUserDommyData (){
//     try {
//         await User_collection.insertMany([
//             {
//                 fullName: 'Zack Bello',
//                 email: 'obomheire@gmail.com',
//                 password: 'Secret@123'
//             }
//         ]);
//     }catch (error){
//         console.log(error)
//     }
// }
// insertUserDommyData ()
// async function insertRecipeDommyData (){
//     try {
//         await Recipe_collection.insertMany([
//             {
//                 title: 'Joloff Rice',
//                 meal_type: 'Breakfast',
//                 difficulty_level: 'Beginner',
//                 ingredients: [{name: 'Onions', price: '2000'}, {name: 'Pepper', price: '1000'}, {name: 'Yam', price: '3000'}],
//                 preparation: 'Mix together'
//             }
//         ]);
//     }catch (error){
//         console.log(error)
//     }
// }
// insertRecipeDommyData ()
