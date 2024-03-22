const Ingr = require("../models/ingr");

exports.getAll = async (req, res) => {
    try{
        const [results, _] = await Ingr.getAll();
        res.status(200).send(results);
    }catch(err){
        console.log(err.message);
        res.status(500);
    }
};