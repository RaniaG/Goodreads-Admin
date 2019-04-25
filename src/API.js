import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosLoggedIn = axios.create();
axiosLoggedIn.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('AwesomeReads')}`;


export const login = (userCredentials) => {
    return axios.post('/users/login', userCredentials);
}
