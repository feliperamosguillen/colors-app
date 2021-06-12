import { API_URL } from '../config/api';

export const getColor = async(id, token) => {
    const url = `${API_URL}colores/${id}`;
    const resp = await fetch(url, { 
        method: 'get', 
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const data = await resp.json();
    return data;
}