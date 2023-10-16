import axios from "axios";

export const PUBLIC_URL = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
})
