import axios from "axios";
const API_URL = "http://localhost:8080/api/ingr";

class IngrService {
  static getAll(){
    return axios.get(API_URL);
  }
}

export default IngrService;