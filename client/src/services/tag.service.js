import axios from "axios";
// const API_URL = "http://localhost:8080/api/tag";
const API_URL = "/api/tag";

class TagService {
  static getAll(){
    return axios.get(API_URL);
  }
}

export default TagService;