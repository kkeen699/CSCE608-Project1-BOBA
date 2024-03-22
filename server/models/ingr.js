const db = require("../config/db");

class Ingr {
    static getAll(){
        const sql = `SELECT * 
                     FROM ingredients;`;
        return db.execute(sql);
    }
}

module.exports = Ingr;