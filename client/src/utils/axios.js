import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3002/api'
});

//add token to request
//Token will be added to local storage after user made login
instance.interceptors.request.use(config => {
    config.headers.Autorization = window.localStorage.getItem('token')
    return config;
});


export default instance;