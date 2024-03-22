const db = require("../config/db");

class Fridge {
    static getAll(user){
        const sql = `SELECT * 
                     FROM (SELECT * FROM fridges WHERE user = ${user}) as f 
                     NATURAL JOIN (SELECT id as ingr, name FROM ingredients) as i
                     ORDER BY exp_date;`;
        return db.execute(sql);
    }

    static addItem(user, ingr){
        const sql = `INSERT INTO fridges
                     value(null, ${user}, ${ingr.ingr}, ${ingr.qty}, \"${ingr.date}\", \"${ingr.exp_date}\");`;
        return db.execute(sql);
    }

    static updateItem(user, itemId, qty){
        const sql = `UPDATE fridges
                     SET qty = ${qty}
                     WHERE id = ${itemId} AND user = ${user};`
        return db.execute(sql);
    }

    static deleteItem(user, itemId){
        const sql = `DELETE FROM fridges
                     WHERE id = ${itemId} AND user = ${user};`
        return db.execute(sql);
    }
}

module.exports = Fridge;