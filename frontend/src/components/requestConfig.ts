import axios from 'axios';
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token")
};

export const setAuthToken = (token: string) => {
    window.localStorage.setItem("auth_token", token);
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (e) {
        console.error("Invalid token:", e);
        return true;
    }
};

export const request = (method: string, url: string, data?: object) => {
    let headers = {};

    
    if (getAuthToken() !== null && getAuthToken() != "null") {
        const token = getAuthToken();
        console.log("Using token:", token);
        if (token && isTokenExpired(token)) {
            console.log("Token expired, removing it from localStorage");
            window.localStorage.removeItem("auth_token");
            headers = {"Authorization": `Bearer `};
        }
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        ...(data && { data })
    })
}