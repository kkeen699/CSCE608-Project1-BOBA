const Recipe = require("../models/recipe");

exports.getMyRecipe = async (req, res) => {
    try{
        const user = req.id;
        const [results, _] = await Recipe.getByUser(user);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
};

exports.getRecipe = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getMyById(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get recipe error");
    }
}

exports.getMyLiked = async (req, res) => {
    try{
        const user = req.id;
        const [results, _] = await Recipe.getMyLiked(user);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get liked error");
    }
};

exports.getItem = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getItem(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get liked error");
    }
}

exports.getCat = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const [results, _] = await Recipe.getCat(recipeId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("get cat error");
    }
}

exports.addRecipe = async (req, res) => {
    try{
        const user = req.id;
        const {recipe} = req.body;
        const [results, _] = await Recipe.addRecipe(user, recipe);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("add recipe error");
    }
}

exports.updateRecipe = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const {recipe} = req.body;
        await Recipe.updateRecipe(user, recipeId, recipe);
        res.status(200).send(`update recipe`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}

exports.deleteRecipe = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        await Recipe.deleteRecipe(user, recipeId);
        res.status(200).send(`delete recipe`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}

exports.addItem = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const {items} = req.body;
        await Recipe.addItem(recipeId, items);
        res.status(200).send(`add item`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}

exports.addCat = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const {cats} = req.body;
        await Recipe.addCat(recipeId, cats);
        res.status(200).send(`add cat`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("add cat Error");
    }
}

exports.deleteItem = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const {items} = req.body;
        await Recipe.deleteItem(recipeId, items);
        res.status(200).send(`delete item`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}

exports.deleteCat = async (req, res) => {
    try{
        const user = req.id;
        const recipeId = req.params.recipeId;
        const {cats} = req.body;
        await Recipe.deleteCat(recipeId, cats);
        res.status(200).send(`delete cat`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("delete cat Error");
    }
}
