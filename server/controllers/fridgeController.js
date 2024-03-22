const Fridge = require("../models/fridge");

exports.getFridge = async (req, res) => {
    try{
        const user = req.id;
        const [results, _] = await Fridge.getAll(user);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("getFridge Error");
    }
};

exports.addFridge = async (req, res) => {
    try{
        const user = req.id;
        const {item} = req.body;
        const [results, _] = await Fridge.addItem(user, item);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("addFridge Error");
    }
}

exports.updateFridge = async (req, res) => {
    try{
        const user = req.id;
        const itemId = req.params.itemId;
        const {qty} = req.body;
        await Fridge.updateItem(user, itemId, qty);
        res.status(200).send(`update fridge ${itemId}`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateFridge Error");
    }
}

exports.deleteFridge = async (req, res) => {
    try{
        const user = req.id;
        const itemId = req.params.itemId;
        await Fridge.deleteItem(user, itemId);
        res.status(200).send(`delete fridge ${itemId}`);
    }catch(err){
        console.log(err.message);
        res.status(500).send("deleteFridge Error");
    }
}