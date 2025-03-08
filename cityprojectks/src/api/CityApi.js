import apiConfig from "./config";

// 🏙️ Dohvati sve gradove
export async function getCities() {
    try {
        const token = localStorage.getItem("token"); // Dohvati token
        if (token) {
            // Dodaj token u zaglavlje ako postoji
            apiConfig.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("Token nije pronađen, zahtjev neće biti autoriziran.");
        }

        const response = await apiConfig.get('/cities');
        return response.data;
    } catch (error) {
        console.error('Greška pri dohvatu gradova:', error.response?.data || error.message);
        throw error;  // Baci grešku dalje
    }
}
