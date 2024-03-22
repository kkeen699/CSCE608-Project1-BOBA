import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class UserService {
  
  static login(email, password) {
    return axios.post(API_URL + "/login", {email, password});
  }
  
  static logout() {
    localStorage.removeItem("user");
  }
  
  static register(email, name, password) {
    return axios.post(API_URL + "/register", {email, name, password});
  }

  static isLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? true : false;
  }
}

export default UserService;