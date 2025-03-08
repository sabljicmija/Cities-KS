import apiConfig from "./config";
import axios from "axios";

// Registracija korisnika
async function signup(inputData) {
    try {
        const response = await apiConfig.post("/users/signup", inputData, {
            headers: { "Content-Type": "application/json" }
        });

        const { token, data: { user } } = response.data;

        if (token) {
            localStorage.setItem("token", token); // Spremaj token
        } else {
            console.error("Token nije vraćen nakon registracije.");
        }

        return { token, user };
    } catch (error) {
        console.error("Pogreška pri registraciji:", error.response?.data || error.message);
        throw error; // Baci grešku dalje
    }
}

// Prijava korisnika
async function login(email, password) {
    try {
        console.log("Podaci za prijavu:", { email, password }); // Debugging

        if (!email || !password) {
            throw new Error("Email i lozinka su obavezni!");
        }

        const response = await apiConfig.post("/users/login", 
            { email, password }, 
            { headers: { "Content-Type": "application/json" } }
        );

        const { token } = response.data;

        if (token) {
            localStorage.setItem("token", token); // Spremaj token u localStorage
        } else {
            console.error("Token nije vraćen!");
        }

        return response.data;
    } catch (error) {
        console.error("Greška pri prijavi:", error.response?.data || error.message);
        throw error; // Baci grešku dalje
    }
}

// Dohvat trenutnog korisnika
async function getMe() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Nema spremljenog tokena!");

        const response = await apiConfig.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.data.user; // Vraćamo korisnika iz odgovora
    } catch (error) {
        console.error("Pogreška pri dohvatu korisnika:", error.response?.data || error.message);
        throw error; // Baci grešku dalje
    }
}

// Provjera tokena na svakom zahtjevu za autentifikaciju
function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Vraća true ako postoji token, inače false
}

const authApi = { signup, login, getMe, isAuthenticated };

export default authApi;
