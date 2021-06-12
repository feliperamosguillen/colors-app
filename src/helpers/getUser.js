import { API_URL } from '../config/api';

export const getUser = async(token) => {
    const url = `${API_URL}me`;
    const resp = await fetch(url, { 
        method: 'post', 
        headers: new Headers({
          'Authorization':  `Bearer ${token}`
        })
    });

    const data = await resp.json();
    return data;
}