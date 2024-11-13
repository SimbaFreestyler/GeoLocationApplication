import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const request = (method: string, url: string, data: object) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}