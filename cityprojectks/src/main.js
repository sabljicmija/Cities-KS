import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; 

import axios from 'axios';

// Globalna konfiguracija axios-a
axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Dodajte token u svaki zahtjev
  }
  return config;
}, error => {
  return Promise.reject(error);
});



const vuetify = createVuetify();
const app = createApp(App)



app.use(createPinia())
app.use(router)
app.use(vuetify) // Automatski će registrirati sve Vuetify komponente

app.mount('#app')
