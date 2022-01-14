/*
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
    type: String,
    required: 'This field is required.'
  },
  meal_type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Supper', 'Snack'],
    required: true
  },
  difficulty_level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  ingredients: [
      {name: String, price: String}
    ],

  preparation: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  updated_At: {
    type: Date,
    default: Date.now,
  }
});

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe_collection', recipeSchema);
*/

// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const subSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    price: {
      type: String,
      require: true,
    },
  });

const recipeSchema = new mongoose.Schema({
    title: {
    type: String,
    required: 'This field is required.'
  },
  meal_type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Supper', 'Snack'],
    required: true
  },
  difficulty_level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  ingredients: [subSchema],

  preparation: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  updated_At: {
    type: Date,
    default: Date.now,
  },
});

// recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe_collection', recipeSchema);