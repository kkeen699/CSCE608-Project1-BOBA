import axios from "axios";
// const API_URL = "http://localhost:8080/api/category";
const API_URL = "/api/category";

class CategoryService {
  static getAll(){
    return axios.get(API_URL);
  }
}

export default CategoryService;