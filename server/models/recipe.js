const db = require("../config/db");

class Recipe {
    static getAllRecipe(user){
        const sql = `SELECT * 
                     FROM (SELECT id, name FROM recipes WHERE user <> ${user}) as r 
                     NATURAL JOIN (SELECT recipe as id, COUNT(user) as nliked 
                                   FROM like_recipes 
                                   WHERE recipe NOT IN (SELECT recipe 
                                                        FROM like_recipes 
                                                        WHERE user = ${user})
                                   GROUP BY recipe) as l
                     ORDER BY nliked DESC`;
        return db.execute(sql);
    }

    static getByIngrs(user, ingrs){ 
        const intersection = ingrs.map((ingr) => 
                                       `(SELECT recipe as id FROM recipe_items
                                        WHERE ingr = ${ingr.value})`)
        const sql = `SELECT * 
                     FROM (SELECT id, name FROM recipes WHERE user <> ${user}) as r 
                     NATURAL JOIN (${intersection.join(" INTERSECT ")}) as i
                     NATURAL JOIN (SELECT recipe as id, COUNT(user) as nliked 
                                   FROM like_recipes
                                   WHERE recipe NOT IN (SELECT recipe 
                                                        FROM like_recipes 
                                                        WHERE user = ${user})
                                   GROUP BY recipe) as l
                     ORDER BY nliked DESC;`;
        return db.execute(sql);
    }

    static getByCats(user, cats){
        const intersection = cats.map((cat) => 
                                       `(SELECT recipe as id FROM recipe_cats
                                        WHERE cat = ${cat.value})`);
        const sql = `SELECT * 
                     FROM (SELECT id, name FROM recipes WHERE user <> ${user}) as r 
                     NATURAL JOIN (${intersection.join(" INTERSECT ")}) as i
                     NATURAL JOIN (SELECT recipe as id, COUNT(user) as nliked 
                                   FROM like_recipes 
                                   WHERE recipe NOT IN (SELECT recipe 
                                                        FROM like_recipes 
                                                        WHERE user = ${user})
                                   GROUP BY recipe) as l
                     ORDER BY nliked DESC;`;
        return db.execute(sql);
    }

    static getByUser(user){
        const sql = `SELECT id, name, user_name 
                     FROM (SELECT id, user, name FROM recipes WHERE user = ${user}) as r
                     NATURAL JOIN (SELECT id as user, name as user_name FROM users) as u;`;
        return db.execute(sql);
    }

    static getById(recipeId){
        const sql = `SELECT * 
                     FROM (SELECT * FROM recipes WHERE id = ${recipeId}) as r
                     NATURAL JOIN (SELECT recipe as id, COUNT(user) as nliked
                                   FROM like_recipes WHERE recipe = ${recipeId}
                                   GROUP BY recipe) as l
                     NATURAL JOIN (SELECT id as user, name as user_name FROM users) as u;`;
        return db.execute(sql);
    }

    static getMyById(recipeId){
        const sql = `SELECT * 
                     FROM recipes 
                     WHERE id = ${recipeId};`;
        return db.execute(sql);
    }

    static getMyLiked(user){
        const sql = `SELECT * 
                     FROM (SELECT recipe as id FROM like_recipes WHERE user = ${user}) as l
                     NATURAL JOIN (SELECT id , name, user FROM recipes) as r
                     WHERE user <> ${user};`;
        return db.execute(sql);
    }

    static getItem(recipe){
        const sql = `SELECT * 
                     FROM (SELECT ingr FROM recipe_items WHERE recipe = ${recipe}) as r 
                     NATURAL JOIN (SELECT id as ingr, name FROM ingredients) as i;`;
        return db.execute(sql);
    }

    static getCat(recipe){
        const sql = `SELECT * 
                     FROM (SELECT cat FROM recipe_cats WHERE recipe = ${recipe}) as r 
                     NATURAL JOIN (SELECT id as cat, name FROM categories) as c;`;
        return db.execute(sql);
    }

    static addRecipe(user, recipe){
        const sql = `INSERT INTO recipes
                     VALUES (null, ${user}, \"${recipe.name}\", \"${recipe.desc}\", 
                     \"${recipe.steps}\", \"${recipe.post_time}\");`
        return db.execute(sql);
    }

    static updateRecipe(user, recipeId, recipe){
        const sql = `UPDATE recipes 
                     SET name = \"${recipe.name}\", \`desc\` = \"${recipe.desc}\", 
                         steps = \"${recipe.steps}\", post_time = \"${recipe.post_time}\" 
                     WHERE user = ${user} AND id = ${recipeId};`;
        return db.execute(sql);
    }

    static deleteRecipe(user, recipeId){
        const sql = `DELETE FROM recipes
                     WHERE user = ${user} AND id = ${recipeId};`;
        return db.execute(sql);
    }

    static addItem(recipeId, items){
        const addItems = items.map((item) => `(${recipeId}, ${item.value})`);
        const sql = `INSERT INTO recipe_items
                     VALUES ${addItems.join(',')};`;
        return db.execute(sql);
    }

    static addCat(recipeId, cats){
        const addCats = cats.map((cat) => `(${recipeId}, ${cat.value})`);
        const sql = `INSERT INTO recipe_cats
                     VALUES ${addCats.join(',')};`;
        return db.execute(sql);
    }

    static deleteItem(recipeId, items){
        const deleteItems = items.map((item) => `(recipe = ${recipeId} AND ingr =  ${item.value})`);
        const sql = `DELETE FROM recipe_items
                     WHERE ${deleteItems.join(' OR ')};`;
        return db.execute(sql);
    }

    static deleteCat(recipeId, cats){
        const deleteCats = cats.map((cat) => `(recipe = ${recipeId} AND cat =  ${cat.value})`);
        const sql = `DELETE FROM recipe_cats
                     WHERE ${deleteCats.join(' OR ')};`;
        return db.execute(sql);
    }

    static getLiked(user, recipeId){
        const sql = `SELECT *
                     FROM like_recipes
                     WHERE user = ${user} AND recipe = ${recipeId};`;
        return db.execute(sql);
    }

    static addLiked(user, recipeId){
        const sql = `INSERT INTO like_recipes
                     VALUES (${user}, ${recipeId});`;
        return db.execute(sql);
    }

    static deleteLiked(user, recipeId){
        const sql = `DELETE FROM like_recipes
                     WHERE user = ${user} AND recipe = ${recipeId};`;
        return db.execute(sql);
    }
}

module.exports = Recipe;