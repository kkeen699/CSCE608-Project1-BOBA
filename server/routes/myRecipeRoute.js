const express = require("express");
const router = express.Router();
const myRecipeController = require("../controllers/myRecipeController");
const verifyToken = require("../config/jwt");

router.route("/")
.get(verifyToken, myRecipeController.getMyRecipe)
.post(verifyToken, myRecipeController.addRecipe)

router.route("/liked")
.get(verifyToken, myRecipeController.getMyLiked)

router.route("/:recipeId")
.get(verifyToken, myRecipeController.getRecipe)
.put(verifyToken, myRecipeController.updateRecipe)
.delete(verifyToken, myRecipeController.deleteRecipe)

router.route("/:recipeId/item")
.get(verifyToken, myRecipeController.getItem)
.post(verifyToken, myRecipeController.addItem)
.delete(verifyToken, myRecipeController.deleteItem)

router.route("/:recipeId/category")
.get(verifyToken, myRecipeController.getCat)
.post(verifyToken, myRecipeController.addCat)
.delete(verifyToken, myRecipeController.deleteCat)

module.exports = router;