import axios from "axios";
import router from "@/router"; // Ako koristiš Vue Router

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// 🔑 Dodaj interceptor da dinamički postavlja token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token iz localStorage-a:", token);  // Provjeri token koji se dohvaća

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("Nema tokena, zahtjev neće biti autoriziran.");
    // Možeš preusmjeriti korisnika na prijavu ili obraditi grešku na neki drugi način
    router.push("/login"); // Preusmjeri na login stranicu ako nema tokena
  }

  return config;
});

// Globalna greška za odgovore API-a
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Greška u API odgovoru:", error.response?.data || error.message);
    // Možeš dodati obraditelje grešaka za korisničke poruke ili preusmjeravanje
    if (error.response?.status === 401) {
      // Ako je greška 401 (Neautorizirano), preusmjeri na login
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

// 🏙️ Dohvati sve gradove
export const getCities = async () => {
  try {
    const response = await api.get("/cities");
    return response.data;
  } catch (error) {
    console.error("Pogreška pri dohvatu gradova:", error.response?.data || error.message);
    throw error;
  }
};

// ➕ Dodaj grad
export const addCity = async (cityData) => {
  console.log("Slanje podataka za dodavanje grada:", cityData); // Provjeri koje podatke šalješ
  try {
    const response = await api.post("/cities", cityData);
    console.log("Odgovor od API-a pri dodavanju grada:", response.data);  // Provjeri odgovor API-a
    return response.data;
  } catch (error) {
    console.error("Pogreška pri dodavanju grada:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Ažuriraj grad
export const updateCity = async (cityId, cityData) => {
  try {
    const response = await api.put(`/cities/${cityId}`, cityData);
    return response.data;
  } catch (error) {
    console.error("Pogreška pri ažuriranju grada:", error.response?.data || error.message);
    throw error;
  }
};

// ❌ Izbriši grad
export const deleteCity = async (cityId) => {
  try {
    const response = await api.delete(`/cities/${cityId}`);
    return response.data;
  } catch (error) {
    console.error("Pogreška pri brisanju grada:", error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Pretraga gradova
export const searchCity = async (searchQuery) => {
  try {
    const response = await api.get("/cities", { params: { name: searchQuery } });
    return response.data;
  } catch (error) {
    console.error("Pogreška pri pretrazi grada:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Export svih API funkcija
export default {
  getCities,
  addCity,
  updateCity,
  deleteCity,
  searchCity,
};
