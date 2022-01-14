"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipeController_1 = require("../controllers/recipeController");
const modules_1 = require("../models/modules");
// APP ROUTE
router.get('/recipes', modules_1.authenticateToken, recipeController_1.getRecipes);
router.get('/recipes/:recipeId', modules_1.authenticateToken, recipeController_1.getRecipeById);
router.post('/recipes', modules_1.authenticateToken, recipeController_1.submitRecipe);
router.put('/recipes/:recipeId', modules_1.authenticateToken, recipeController_1.updateRecipe);
router.delete('/recipes/:recipeId', modules_1.authenticateToken, recipeController_1.deleteRecipe);
router.post('/user/signup', recipeController_1.userSignUp);
router.post('/user/login', recipeController_1.userLogin);
router.get('/user/logout', recipeController_1.userLogout);
exports.default = router;
