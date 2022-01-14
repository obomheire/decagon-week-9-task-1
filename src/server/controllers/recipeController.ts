require('../models/database')
const User_collection = require('../models/user_collection')
const Recipe_collection = require('../models/recipe_collection')
import express, {Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken') 
import { joiShemaReg, joiShemaLog, createToken} from '../models/modules'



export let getRecipes = async (req: Request, res: Response, next: NextFunction) => {

    try{
      let page = Number(req.query.page)
      let size = Number(req.query.size)
 
      if(!page) page = 1
      if(!size) size = 5
 
        const limit = size
        const skip = ( page - 1 ) * size

        const recipes = await Recipe_collection.find().limit(limit).skip(skip)

        res.status(200).send(recipes) 

    }catch (error){
        res.status(500).send({message: error || 'Error Occured'}) 
    }

    }

export let getRecipeById = async (req: Request, res: Response, next: NextFunction) => {

      if(!req.params.recipeId) return res.status(404).json({message: 'ID parameter is requred'})

      try {
        // console.log(req.params.recipeId);
        const recipeById = await Recipe_collection.findById(req.params.recipeId);

        if(!recipeById) return res.status(204).json({'Message': `No recipe matches ID ${req.params.recipeId}`})
        
        res.status(200).send(recipeById)
      } catch (error: any) {
        // res.status(500).send({message: error.message || "Error Occured" });
        console.log(error.message);
      }
    }
    

    export let submitRecipe = async (req: Request, res: Response, next: NextFunction) => {
      try {
console.log(req.body)
    // const newRecipe = new Recipe_collection(req.body)
    // res.json(req.body.ingredients)
    
        const newRecipe = new Recipe_collection({ 
          title: req.body.title,
          meal_type: req.body.meal_type,
          difficulty_level: req.body.difficulty_level,
          ingredients: req.body.ingredients,
          preparation: req.body.preparation
      
        });

        await newRecipe.save();
        res.json(newRecipe).status(200)

      } catch (error: any) {
        console.log(error.message);
      }
    }

    export let updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
    
      if(!req.params.recipeId) return res.status(404).json({message: 'ID parameter is requred'})
  
      try {
        const editRecipe = await Recipe_collection.findOne({_id: req.params.recipeId}).exec();
    
      if(!editRecipe) return res.status(204).json({'Message': `No recipe matches ID ${req.params.recipeId}`})
     
      editRecipe.title = req.body.title
      editRecipe.meal_type = req.body.meal_type
      editRecipe.difficulty_level = req.body.difficulty_level
      editRecipe.ingredients = req.body.ingredients
      editRecipe.preparation = req.body.preparation
        
        await editRecipe.save();
        res.json(editRecipe)
    
      } catch (error: any) {
        console.log(error.message);
      }
    }

    export let deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {

      if(!req.params.recipeId) return res.status(404).json({message: 'ID parameter is requred'})
  
      try {
        const removeRecipe = await Recipe_collection.deleteOne({_id: req.params.recipeId});
    
      if(!removeRecipe) return res.status(204).json({'Message': `No recipe matches ID ${req.params.recipeId}`})
    
        res.json(removeRecipe)
    
      } catch (error: any) {
        console.log(error.message);
      }
    }

    export let userSignUp = async (req: Request, res: Response, next: NextFunction) =>{
      try {
        let { fullName, email, password } = req.body

        const result = joiShemaReg().validate({fullName: fullName, email: email, password: password})
      
        if (result.error){
          res.send({error: result.error.details[0].message})
        } 
        else{
  
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
  
        
            const newUser = await User_collection.create({ 
              fullName: fullName,
              email: email,
              password: hashed
            });
    
            // await newUser.save();
            res.json(newUser)
    
          }
        } catch (error: any) {
          res.send({ 'Error':error.message});
          // console.log(error)
        }
  }

    export let userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try{
      let { email, password } = req.body
    
      const result = joiShemaLog().validate({email: email, password: password})
    
      if (result.error){
        res.send({ error: result.error.details[0].message})
        
      }
      else{ 
    
        const loginUser = await User_collection.findOne({email: email}).exec();

      if (!loginUser){
        res.json({ Message: 'User not Found'})
    }else{
       
      const validatePassword = await bcrypt.compare(password, loginUser.password)
    
      if (!validatePassword) res.send({Message: 'incorrect_login'})
      else {
        createToken(email,loginUser, res)
        res.status(200)
    
      }
 
    }
  }
}catch (error: any) {
  console.log(error.message);
}
}

export let userLogout =  async (req: Request, res: Response, next: NextFunction) => {

   try{
    res.clearCookie('jwtToken');
    res.send({message: "User sucesssfuly logout"})
   }catch(error: any){
    console.log(error.message);
   }
}


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

