import axios from 'axios';

const API_BASE_URL = "http://172.104.60.233:5000/random_response";

class Service {
    getResponse(message) {
        console.log(message);
        return axios.post(API_BASE_URL, { message });
    }
}

export default new Service();
