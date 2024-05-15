import axios from "axios";
// const API_URL = "http://localhost:8080/api/fridge";
const API_URL = "/api/fridge";

class FridgeService {
  
  static getFridge(){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, {headers: {Authorization: token}});
  }

  static addFridge(item){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL, {item}, {headers: {Authorization: token}});
  }

  static updateFridge(itemId, qty){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL+`/${itemId}`, {qty}, {headers: {Authorization: token}});
  }

  static deleteFridge(itemId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL+`/${itemId}`, {headers: {Authorization: token}});
  }
}

export default FridgeService;