import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/dynamic-data-retrieve/invoke";

class Service {
    getResponse(input) {
        console.log(input);
        return axios.post(API_BASE_URL, { input });
    }
}

export default new Service();
