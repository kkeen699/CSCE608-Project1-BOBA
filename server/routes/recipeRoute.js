const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const verifyToken = require("../config/jwt");

router.route("/")
.get(verifyToken, recipeController.getAllRecipe)

router.route("/ingrs")
.post(verifyToken, recipeController.getByIngrs)

router.route("/cats")
.post(verifyToken, recipeController.getByCats)

router.route("/user/:userId")
.get(verifyToken, recipeController.getUserRecipe)

router.route("/:recipeId")
.get(verifyToken, recipeController.getRecipe)

router.route("/:recipeId/item")
.get(verifyToken, recipeController.getRecipeItem)

router.route("/:recipeId/category")
.get(verifyToken, recipeController.getRecipeCat)

router.route("/liked/:recipeId")
.get(verifyToken, recipeController.getLiked)
.post(verifyToken, recipeController.addLiked)
.delete(verifyToken, recipeController.deleteLiked)


module.exports = router;