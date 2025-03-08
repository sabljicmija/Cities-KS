<template>
    <div class="update-city">
      <h2>Ažuriraj grad</h2>
      <select v-model="selectedCityId">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
      <input v-model="updatedCity.name" type="text" placeholder="Novo ime grada" />
      <input v-model="updatedCity.country" type="text" placeholder="Nova država" />
      <button @click="updateCity">Ažuriraj grad</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import cityApi from '@/api/city';
  import { getCities } from '@/api/CityApi';
  
  const cities = ref([]);
  const selectedCityId = ref(null);
  const updatedCity = ref({
    name: '',
    country: ''
  });
  
  onMounted(async () => {
    try {
      cities.value = await cityApi.getCities();
    } catch (error) {
      console.error('Greška pri dohvatu gradova:', error);
    }
  });
  
  async function updateCity() {
    if (selectedCityId.value) {
      try {
        await cityApi.updateCity(selectedCityId.value, updatedCity.value);
        console.log('Grad je ažuriran');
      } catch (error) {
        console.error('Greška pri ažuriranju grada:', error);
      }
    }
  }
  </script>
  