<template>
    <div class="city-details-container">
      <div class="city-card">
        <h1 class="city-title">{{ city.name }}</h1>
        <h2 class="city-subtitle">{{ city.description }}</h2>
        <hr class="divider">
        <!-- Ovdje možeš dodati više informacija o gradu -->
        <button class="back-button" @click="goBack">Povratak</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      city: {
        type: Object,
        required: true
      }
    },
    methods: {
      goBack() {
        this.$router.push('/'); // Vraćanje na početnu stranicu
      }
    }
  }
  </script>
  
  <style scoped>
  .city-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .city-card {
    background-color: #915F6D; /* glavna boja */
    color: #000000; /* on-primary boja */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  
  .city-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .city-subtitle {
    font-size: 1.25rem;
    color: #5C2C2C; /* primary dark boja */
    margin-bottom: 20px;
  }
  
  .divider {
    border: 1px solid #000000;
    margin: 20px 0;
  }
  
  .back-button {
    background-color: #915F6D; /* glavna boja */
    color: #000000;
    font-weight: bold;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: #5C2C2C; /* primary dark boja */
  }
  </style>
  