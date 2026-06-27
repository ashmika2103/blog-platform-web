import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-backend-5cmt.onrender.com", // change if your backend runs elsewhere
});

export default API;