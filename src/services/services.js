import axios from 'axios';

const API_BASE_URL = {
    dynamic: "http://127.0.0.1:8000/dynamic-data-retrieve/invoke",
    admin: "http://127.0.0.1:8000/admin-assist/invoke"
}

class Service {
    getResponse(input, selectedOption) {
        console.log(selectedOption);
        /* need to select a case checking selectedOption */

        return axios.post(API_BASE_URL[selectedOption], { input });
    }
}

export default new Service();
