import { useState, useEffect } from 'react';
import { getColors } from '../helpers/getColors';

export const useFetchColors = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        getColors(page).then( colors => setState({
            data: colors,
            loading: false
        })).catch(error => {
            console.log(error);
          });
    }, [page]);

    return state;   
}