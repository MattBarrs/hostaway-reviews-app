import axios from 'axios';

export const createClient = () => {
    return axios.create({
        baseURL: 'https://api.hostaway.com', // Replace with the actual base URL of the Hostaway Reviews API
        headers: {
            'Content-Type': 'application/json',
        },
    });
};