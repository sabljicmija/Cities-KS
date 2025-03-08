<template>
  <div class="add-city">
    <h2>Dodaj novi grad</h2>
    <form @submit.prevent="addCity">
      <input v-model="city.name" type="text" placeholder="Ime grada" required />
      <input v-model="city.country" type="text" placeholder="Država" required />
      <button type="submit">Dodaj grad</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import cityApi from '@/api/city';
import { getCities } from '@/api/CityApi';
const city = ref({
  name: '',
  country: ''
});

async function addCity() {
  try {
    const addedCity = await cityApi.addCity(city.value);
    console.log('Grad je dodan:', addedCity);
    // Ovdje možeš emitirati događaj ili ažurirati stanje
  } catch (error) {
    console.error('Greška pri dodavanju grada:', error);
  }
}
</script>


<style scoped>
.add-city {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  max-width: 500px;
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

.add-btn {
  padding: 10px;
  background-color: var(--primary);
  color: var(--on-primary);
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.add-btn:disabled {
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
