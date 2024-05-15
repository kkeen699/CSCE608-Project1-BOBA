import axios from "axios";
// const API_URL = "http://localhost:8080/api/list";
const API_URL = "/api/list";


class ListService {
  
  static getAll(){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, {headers: {Authorization: token}});
  }

  static getList(listId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/${listId}`, {headers: {Authorization: token}});
  }

  static addList(name, notes){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL, {name, notes}, {headers: {Authorization: token}});
  }

  static updateList(listId, name, notes){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL+`/${listId}`, {name, notes}, {headers: {Authorization: token}});
  }

  static deleteList(listId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL+`/${listId}`, {headers: {Authorization: token}});
  }

  static getItem(listId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL+`/${listId}/item`, {headers: {Authorization: token}});
  }

  static addItem(listId, item){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL+`/${listId}/item`, {item}, {headers: {Authorization: token}});
  }

  static updateItem(itemId, qty){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL+`/item/${itemId}`, {qty}, {headers: {Authorization: token}});
  }

  static deleteItem(itemId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log(itemId);
    return axios.delete(API_URL+`/item/${itemId}`, {headers: {Authorization: token}});
  }
}

export default ListService;