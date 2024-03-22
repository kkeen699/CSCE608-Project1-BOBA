import axios from "axios";
const API_URL = "http://localhost:8080/api/recipe";

class RecipeService {
  
  static getAllRecipe(){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, {headers: {Authorization: token}});
  }

  static getUserRecipe(userId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/user/${userId}`, {headers: {Authorization: token}});
  }

  static getByIngrs(ingrs){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log(ingrs);
    return axios.post(API_URL+"/ingrs", {ingrs}, {headers: {Authorization: token}});
  }

  static getByCats(cats){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL+"/cats", {cats}, {headers: {Authorization: token}});
  }

  static getRecipe(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/${recipeId}`, {headers: {Authorization: token}});
  }

  static getRecipeItem(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/${recipeId}/item`, {headers: {Authorization: token}});
  }

  static getRecipeCat(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/${recipeId}/category`, {headers: {Authorization: token}});
  }

  static getLiked(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/liked/${recipeId}`, {headers: {Authorization: token}});
  }

  static addLiked(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL+`/liked/${recipeId}`, {}, {headers: {Authorization: token}});
  }

  static deleteLiked(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL+`/liked/${recipeId}`, {headers: {Authorization: token}});
  }
}

export default RecipeService;