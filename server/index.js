require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const fridgeRoute = require("./routes/fridgeRoute");
const ingrRoute = require("./routes/ingrRoute");
const tagRoute = require("./routes/tagRoute")
const listRoute = require("./routes/listRoute");
const myRecipeRoute = require("./routes/myRecipeRoute");
const recipeRoute = require("./routes/recipeRoute");
const categoryRoute = require("./routes/categoryRoute");

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
    app.use(cors()); // Enable to run two localhost ports
};

app.use("/api/user", userRoute);
app.use("/api/fridge", fridgeRoute);
app.use("/api/ingr", ingrRoute);
app.use("/api/list", listRoute);
app.use("/api/myrecipe", myRecipeRoute);
app.use("/api/recipe", recipeRoute);
app.use("/api/tag", tagRoute);
app.use("/api/category", categoryRoute);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Serving on port ${port}.`)
})
