import { useState, useEffect } from 'react';
import { getColor } from '../helpers/getColor';

export const useFetchColor = (id, token) => {
    console.log("id", id);


    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getColor(id, token).then( color => setState({
            data: color,
            loading: false
        })).catch(error => {
          });
    }, []);

    return state;   
}