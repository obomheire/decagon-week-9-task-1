import express from 'express'
const router = express.Router();
import { getRecipes, getRecipeById, submitRecipe, updateRecipe, deleteRecipe, userSignUp, userLogin, userLogout} from '../controllers/recipeController'
import { authenticateToken } from '../models/modules';

// APP ROUTE

router.get('/recipes',authenticateToken, getRecipes)
router.get('/recipes/:recipeId', authenticateToken, getRecipeById)
router.post('/recipes',authenticateToken,  submitRecipe)
router.put('/recipes/:recipeId',authenticateToken, updateRecipe)
router.delete('/recipes/:recipeId',authenticateToken, deleteRecipe)
router.post('/user/signup', userSignUp)
router.post('/user/login', userLogin)
router.get('/user/logout', userLogout)

export default router  