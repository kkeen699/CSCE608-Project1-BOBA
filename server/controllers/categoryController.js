const Category = require("../models/category");

exports.getAll = async (req, res) => {
    try{
        const [results, _] = await Category.getAll();
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500);
    }
};