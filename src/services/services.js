import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/dynamic-data-retrieve/invoke";

class Service {
    getResponse(input, selectedOption) {
        console.log(selectedOption);
        /* need to select a case checking selectedOption */

        return axios.post(API_BASE_URL, { input });
    }
}

export default new Service();
