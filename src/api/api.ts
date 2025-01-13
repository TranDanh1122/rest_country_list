import axios from "axios";
const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    timeout: 5000,
    headers: { 
        'Upgrade-Insecure-Requests': '1',
        'Accept': 'application/json',
    }
})

export default api