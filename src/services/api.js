import axios from "axios";

const api = axios.create({
    baseURL: "htto://localhost:3000"
});

export default api;
