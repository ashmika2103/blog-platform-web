import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-backend-5cmt.onrender.com/api",
});

export default API;