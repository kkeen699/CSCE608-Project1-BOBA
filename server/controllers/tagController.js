const Tag = require("../models/tag");

exports.getAll = async (req, res) => {
    try{
        const [results, _] = await Tag.getAll();
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500);
    }
};