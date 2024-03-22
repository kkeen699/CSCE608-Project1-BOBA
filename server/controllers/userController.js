const User = require("../models/user")
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = async (req, res) => {
    try{
        const {email, name, password} = req.body;
        // const user = new User(email, name, password);
        const [resutls, _] = await User.register(email, name, password);

        res.status(200).send("Register Successfully");
    }catch(err){
        console.log(err.message);
        res.status(500).send("Register Error");
    }
};

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const [results, _] = await User.find_by_email(email);
        if(results.length > 0 && results[0].password == password){
            console.log("Login Successfully");
            const tokenObject = { id: results[0].id};
            const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
            res.status(200).send({ token: token });
        }
        else{
            console.log("Wrong Email or Password");
            res.status(500).send("Wrong Email or Password");
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send("Login Error");
    }
}