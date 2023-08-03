import axios from 'axios';

const httpClient = axios.create({
    baseURL: "http://localhost:4000/api",
    //baseURL: "http://192.168.2.3:4000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;