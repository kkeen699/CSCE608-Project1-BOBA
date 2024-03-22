const List = require("../models/list");

exports.getAll = async (req, res) => {
    try{
        const user = req.id;
        const [results, _] = await List.getAll(user);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("getAll Error");
    }
};

exports.getList = async (req, res) => {
    try{
        const user = req.id;
        const listId = req.params.listId;
        const [results, _] = await List.getList(user, listId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("getList Error");
    }
};

exports.addList = async (req, res) => {
    try{
        const user = req.id;
        const {name, notes} = req.body;
        const [results, _] = await List.addList(user, name, notes);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("addList Error");
    }
}

exports.updateList = async (req, res) => {
    try{
        const user = req.id;
        const listId = req.params.listId;
        const {name, notes} = req.body;
        await List.updateList(user, listId, name, notes);
        res.status(200).send(`update list ${listId}`)
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateList Error");
    }
}

exports.deleteList = async (req, res) => {
    try{
        const user = req.id;
        const listId = req.params.listId;
        await List.deleteList(user, listId);
        res.status(200).send(`delete list ${listId}`);
    }catch(err){
        console.log(err.message);
        res.status(500).send("deleteList Error");
    }
}

exports.getItem = async (req, res) => {
    try{
        const listId = req.params.listId;
        const [results, _] = await List.getItem(listId);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("getItem Error");
    }
}

exports.addItem = async (req, res) => {
    try{
        const listId = req.params.listId;
        const {item} = req.body;
        const [results, _] = await List.addItem(listId, item);
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500).send("addItem Error");
    }
}

exports.updateItem = async (req, res) => {
    try{
        const itemId = req.params.itemId;
        const {qty} = req.body;
        await List.updateItem(itemId, qty);
        res.status(200);
    }catch(err){
        console.log(err.message);
        res.status(500).send("updateItem Error");
    }
}

exports.deleteItem = async (req, res) => {
    try{
        const itemId = req.params.itemId;
        console.log(itemId);
        await List.deleteItem(itemId);
        res.status(200);
    }catch(err){
        console.log(err.message);
        res.status(500).send("deleteItem Error");
    }
}