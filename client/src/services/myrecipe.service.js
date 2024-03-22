import axios from "axios";
const API_URL = "http://localhost:8080/api/myrecipe";

class MyRecipeService {
  
  static getAllRecipe(){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, {headers: {Authorization: token}});
  }

  static getMyRecipe(recipeId){
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

  static getMyLiked(){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+"/liked", {headers: {Authorization: token}});
  }

  static addRecipe(recipe){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL, {recipe}, {headers: {Authorization: token}});
  }

  static updateRecipe(recipeId, recipe){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL+`/${recipeId}`, {recipe}, {headers: {Authorization: token}});
  }

  static deleteRecipe(recipeId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL+`/${recipeId}`, {headers: {Authorization: token}});
  }

  static addItem(recipeId, items){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL+`/${recipeId}/item`, {items}, {headers: {Authorization: token}});
  }

  static deleteItem(recipeId, items){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios({method: 'delete', url: API_URL+`/${recipeId}/item`, data: {items},
      headers: {Authorization: token}})
    // return axios.delete(API_URL+`/${recipeId}/item`, {items}, {headers: {Authorization: token}});
  }

  static addCat(recipeId, cats){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL+`/${recipeId}/category`, {cats}, {headers: {Authorization: token}});
  }

  static deleteCat(recipeId, cats){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios({method: 'delete', url: API_URL+`/${recipeId}/category`, data: {cats},
      headers: {Authorization: token}})
    // return axios.delete(API_URL+`/${recipeId}/item`, {items}, {headers: {Authorization: token}});
  }
}

export default MyRecipeService;