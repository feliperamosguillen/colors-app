import { API_URL } from '../config/api';

export const getColors = async(currentPage) => {
    const url = `${API_URL}colores?page=${currentPage}`;
    const resp = await fetch(url, { 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC91c2Vyc1wvbG9naW4iLCJpYXQiOjE2MjM0NjM4MDAsImV4cCI6NDE1MDIyNTE3MDAsIm5iZiI6MTYyMzQ2MzgwMCwianRpIjoieUw4YTJCTDhsZG1PSHpHTiIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.Vo49MmbHLu_aAxa1yVcY1zu9KZKgBQzhDuTsrZOkylI'
        })
    });

    const data = await resp.json();
    return data;
}