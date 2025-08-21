import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://54.205.253.121:8080"
    // baseURL: "http://localhost:8080"
    // baseURL: "http://192.168.29.185:8080"
    // baseURL: "http://51.21.252.113:8080"
});

axiosInstance.interceptors.request.use(config => {
    return config;
});

export default axiosInstance;