import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosLoggedIn = axios.create();
axiosLoggedIn.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('AwesomeReads-admin')}`;


export const login = (userCredentials) => {
    return axios.post('/users/login', userCredentials);
}

export const getCategories = () => {
    return axios.get('/categories', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('AwesomeReads-admin')}`
        }
    })
        .then(res => res.data)
}

export const addCategory = ({ name }) => {
    return axios.post('/categories',
        { name },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('AwesomeReads-admin')}` }
        })
        .then(res => res.data)
}

export const editCategory = ({ name, id }) => {

    return axios.patch(`/categories/${id}`,
        { name },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('AwesomeReads-admin')}` }
        })
        .then(res => res.data);
}