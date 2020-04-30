import axios from 'axios';

const api = axios.create({
    baseURL : 'https://casos-275318.uc.r.appspot.com'
});

export default api;