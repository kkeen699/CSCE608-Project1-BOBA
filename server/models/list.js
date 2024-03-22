const db = require("../config/db")

class List{

    static getAll(user){
        const sql = `SELECT * FROM shopping_lists
                     WHERE user = ${user};`;
        return db.execute(sql);
    }

    static getList(user, listId){ 
        const sql = `SELECT * FROM shopping_lists
                     WHERE user = ${user} AND id = ${listId};`;

        return db.execute(sql);
    }

    static addList(user, name, notes){
        const sql = `INSERT INTO shopping_lists
                     VALUES (null, ${user}, \"${name}\", \"${notes}\");`;
        return db.execute(sql);
    }

    static updateList(user, listId, name, notes){
        const sql = `UPDATE shopping_lists
                     SET name = \"${name}\", notes = \"${notes}\"
                     WHERE id = ${listId} AND user = ${user};`
        return db.execute(sql);
    }

    static deleteList(user, listId){
        const sql = `DELETE FROM shopping_lists
                     WHERE id = ${listId} AND user = ${user};`
        return db.execute(sql);
    }

    static getItem(listId){
        const sql = `SELECT * 
                     FROM (SELECT * FROM shopping_list_items WHERE list = ${listId}) as s
                     NATURAL JOIN (SELECT id as ingr, name FROM ingredients) as i;`
        return db.execute(sql);
    }

    static addItem(listId, item){
        const sql = `INSERT INTO shopping_list_items
                     VALUES (null, ${listId}, ${item.ingr}, ${item.qty});`
        return db.execute(sql);
    }

    static updateItem(itemId, qty){
        const sql = `UPDATE shopping_list_items
                     SET qty = ${qty}
                     WHERE id = ${itemId};`
        return db.execute(sql);
    }

    static deleteItem(itemId){
        const sql = `DELETE FROM shopping_list_items
                     WHERE id = ${itemId};`
        return db.execute(sql);
    }
}

module.exports = List;