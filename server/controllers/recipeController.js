const Recipe = require("../models/recipe");

exports.getAllRecipe = async (req, res) => {
    try{
        const user = req.id;
        const [results, _] = await Recipe.getAllRecipe(user);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.getUserRecipe = async (req, res) => {
    try{
        const userId = req.params.userId;
        const [results, _] = await Recipe.getByUser(userId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.getByIngrs = async (req, res) => {
    try{
        const userId = req.id;
        const {ingrs} = req.body;
        const [results, _] = await Recipe.getByIngrs(userId, ingrs);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.getByCats = async (req, res) => {
    try{
        const userId = req.id;
        const {cats} = req.body;
        const [results, _] = await Recipe.getByCats(userId, cats);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.getRecipe = async (req, res) => {
    try{
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getById(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
}

exports.getRecipeItem = async (req, res) => {
    try{
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getItem(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get item error");
    }
}

exports.getRecipeCat = async (req, res) => {
    try{
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getCat(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get cat error");
    }
}

exports.getLiked = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getLiked(user, recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.addLiked = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        await Recipe.addLiked(user, recipeId);
        res.status(200).send("add like");
    }catch(err){
        console.log(err.message);
        res.status(500).send("add recipe error");
    }
}


exports.deleteLiked = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        await Recipe.deleteLiked(user, recipeId);
        res.status(200).send(`delete recipe`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}