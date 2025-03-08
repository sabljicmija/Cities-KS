<template>
    <div class="delete-city">
      <h2>Obriši grad</h2>
      <select v-model="selectedCityId">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
      <button @click="deleteCity">Obriši grad</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import cityApi from '@/api/city';
  import { getCities } from '@/api/CityApi';
  
  const cities = ref([]);
  const selectedCityId = ref(null);
  
  onMounted(async () => {
    try {
      cities.value = await cityApi.getCities();
    } catch (error) {
      console.error('Greška pri dohvatu gradova:', error);
    }
  });
  
  async function deleteCity() {
    if (selectedCityId.value) {
      try {
        await cityApi.deleteCity(selectedCityId.value);
        console.log('Grad je obrisan');
        // Ovdje možeš ažurirati stanje i ukloniti obrisani grad s liste
      } catch (error) {
        console.error('Greška pri brisanju grada:', error);
      }
    }
  }
  </script>
  

<style scoped>
.delete-city {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
}

h2 {
  color: var(--primary);
}

.input-container {
  margin-top: 20px;
}

.input-field {
  padding: 10px;
  width: 80%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid var(--primary-dark);
}

.delete-btn {
  padding: 10px;
  background-color: var(--primary);
  color: var(--on-primary);
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.delete-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-weight: bold;
}

.success {
  color: green;
  font-weight: bold;
}
</style>
