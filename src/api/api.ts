import axios from "axios";
const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/api",
    timeout: 5000
})

export default api