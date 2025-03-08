import axios from 'axios';

export const apiConfig = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor za dodavanje tokena u svaki zahtjev
apiConfig.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log("Dodajem token u zaglavlje:", token);  // Logiraj token za praćenje
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Nema tokena za autorizaciju.");  // Upozorenje ako nema tokena
    }
    return config;
}, (error) => {
    console.error("Greška pri dodavanju tokena:", error);
    return Promise.reject(error);
});

export default apiConfig;
