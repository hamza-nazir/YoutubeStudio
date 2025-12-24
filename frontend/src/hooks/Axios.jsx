import axios from "axios";

const Axios = axios.create({
  baseURL: "https://youtubestudio-1.onrender.com", 
  withCredentials: true,
});

export default Axios;
