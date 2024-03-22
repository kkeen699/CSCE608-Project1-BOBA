const db = require("../config/db");

class Tag {
    static getAll(){
        const sql = `SELECT * 
                     FROM tags;`;
        return db.execute(sql);
    }
}

module.exports = Tag;