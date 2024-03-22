import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProvider from "./context/user-context";

import NavBar from "./components/navbar-component";
import BobaHome from "./components/boba-component";
import Register from "./components/register-component";
import Login from "./components/login-component";

import Home from "./components/home-component";

import AllList from "./components/shoppingList/allList-component";
import MyList from "./components/shoppingList/myList-component";

import MyRecipeHome from "./components/recipe/myRecipeHome-component";
import MyRecipePage from "./components/recipe/myRecipe-component";
import EditRecipePage from "./components/recipe/editRecipe-component";
import NewRecipePage from "./components/recipe/newRecipe-component";

import ExploreRecipe from "./components/recipe/exploreRecipe-component";
import RecipePage from "./components/recipe/recipePage-component";
import UserRecipePage from "./components/recipe/userRecipe-component";

import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  return (
    <div>
      <UserProvider>
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<BobaHome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} /> 
          <Route path="/mylist" element={<AllList/>} />
          <Route path="/mylist/:listId" element={<MyList/>} />
          <Route path="/myrecipe" element={<MyRecipeHome/>} />
          <Route path="/myrecipe/:recipeId" element={<MyRecipePage/>} />
          <Route path="/myrecipe/:recipeId/edit" element={<EditRecipePage/>} />
          <Route path="/myrecipe/newrecipe" element={<NewRecipePage/>} />
          <Route path="/recipes" element={<ExploreRecipe/>} />
          <Route path="/recipes/:recipeId" element={<RecipePage/>} />
          <Route path="/recipes/user/:userId" element={<UserRecipePage/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
