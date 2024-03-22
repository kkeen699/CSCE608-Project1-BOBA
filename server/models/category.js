const db = require("../config/db");

class Category {
    static getAll(){
        const sql = `SELECT * 
                     FROM categories;`;
        return db.execute(sql);
    }
}

module.exports = Category;