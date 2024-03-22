const db = require("../config/db");

class User {
    
    // constructor(email, name, password){
    //     this.email = email;
    //     this.name = name;
    //     this.password = password;
    // }

    static register(email, name, password){
        const sql = `INSERT INTO users(email, name, password)
                     VALUES ('${email}', '${name}', '${password}');`
        return db.execute(sql);
    }

    static find_by_email(email){
        const sql = `SELECT * FROM users
                     WHERE email = '${email}';`;
        return db.execute(sql);
    }
}

module.exports = User;