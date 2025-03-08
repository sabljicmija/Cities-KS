<template>
    <div class="homepage">
      <h1 class="page-title">Add a City</h1>
  
      <!-- Search Bar Above Form -->
      <div class="search-container">
        <input v-model="searchQuery" placeholder="Search for a city" class="search-bar" />
      </div>
  
      <!-- Add City Form -->
      <form @submit.prevent="submitForm" class="form-container">
        <div class="input-group">
          <input v-model="cityData.name" placeholder="City Name" required name="name" />
        </div>
        <div class="input-group">
          <input v-model="cityData.country" placeholder="Country" required />
        </div>
        <div class="input-group">
          <textarea v-model="cityData.description" placeholder="City Description" required></textarea>
        </div>
        <div class="input-group">
          <input v-model="cityData.settledYear" placeholder="Year Established" type="number" />
        </div>
        <div class="input-group">
          <input v-model="cityData.consolidatedYear" placeholder="Year Consolidated" type="number" />
        </div>
        <div class="input-group">
          <input v-model="cityData.population" placeholder="Population" type="number" />
        </div>
        <div class="input-group">
          <input v-model="cityData.zipCode" placeholder="Zip Code" type="number" />
        </div>
        <div class="input-group">
          <input v-model="cityData.imageUrl" placeholder="Image URL" />
        </div>
        <button type="submit" :disabled="loading" class="submit-btn">Add City</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="loading">Submitting...</p>
  
      <!-- Search and Display Cities -->
      <div v-if="filteredCities.length > 0" class="cities-list">
        <h2>Added Cities:</h2>
        <br><br>
        <ul>
          <li v-for="city in filteredCities" :key="city.id" class="city-item">
            <div class="city-info">
              <img v-if="city.imageUrl" :src="cleanImageUrl(city.imageUrl)" alt="City Image" class="city-image" />
              <div class="city-details">
                <h3>{{ city.name }}</h3>
                <p><strong>Country:</strong> {{ city.country }}</p>
                <p v-if="city.description"><strong>Description:</strong> {{ city.description }}</p>
                <p v-if="city.population"><strong>Population:</strong> {{ city.population }}</p>
                <p v-if="city.settledYear"><strong>Year Established:</strong> {{ city.settledYear }}</p>
                <p v-if="city.consolidatedYear"><strong>Year Consolidated:</strong> {{ city.consolidatedYear }}</p>
                <p v-if="city.zipCode"><strong>Zip Code:</strong> {{ city.zipCode }}</p>
              </div>
            </div>
            <button @click="deleteCity(city.id)" class="delete-btn">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { addCity, getCities, deleteCity } from "@/api/city";
  
  export default {
    data() {
      return {
        cityData: {
          name: "",
          country: "",
          description: "",
          settledYear: null,
          consolidatedYear: null,
          population: null,
          zipCode: null,
          imageUrl: "",
        },
        cities: [], // List of cities
        errorMessage: "",
        loading: false,
        searchQuery: "", // For search functionality
      };
    },
    mounted() {
      this.fetchCities(); // Fetch cities as soon as the page is loaded
    },
    computed: {
      filteredCities() {
        return this.cities.filter((city) =>
          city.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchCities() {
        try {
          const response = await getCities();
          console.log(response.data); // Provjeravaj cijeli odgovor od API-ja
  
          if (Array.isArray(response.data.cities)) {
            this.cities = response.data.cities;
          } else {
            console.error("API odgovor nije niz:", response.data);
            this.cities = [];
          }
        } catch (error) {
          console.error("Pogreška prilikom dohvaćanja gradova:", error);
          this.cities = []; // Ako dođe do pogreške, postavi praznu listu
        }
      },
  
      async submitForm() {
        this.errorMessage = "";
        this.loading = true;
        try {
          const response = await addCity(this.cityData);
          console.log("Grad uspješno dodan:", response);
          this.cityData = {
            name: "",
            country: "",
            description: "",
            settledYear: null,
            consolidatedYear: null,
            population: null,
            zipCode: null,
            imageUrl: "",
          };
          this.fetchCities(); // Refresh the cities list after adding a new city
        } catch (error) {
          console.error("Pogreška prilikom dodavanja grada:", error);
          this.errorMessage = "Pogreška prilikom dodavanja grada. Pokušajte ponovno.";
        } finally {
          this.loading = false;
        }
      },
  
      async deleteCity(cityId) {
        try {
          const confirmation = confirm("Are you sure you want to delete this city?");
          if (confirmation) {
            const response = await deleteCity(cityId);
            console.log("Grad uspješno obrisan:", response);
            this.fetchCities(); // Refresh the cities list after deletion
          }
        } catch (error) {
          console.error("Pogreška prilikom brisanja grada:", error);
          this.errorMessage = "Pogreška prilikom brisanja grada. Pokušajte ponovno.";
        }
      },
  
      cleanImageUrl(imageUrl) {
        return imageUrl.replace(/['"]+/g, ''); // Remove quotes from image URL
      }
    },
  };
  </script>
  
  <style scoped>
  p, h1, h2, h3, h4, h5, h6, span, div {
    color: var(--primary-dark);
  }
  
  h2 {
    color: var(--primary-dark);
  }
  
  .homepage {
    background-image: url('@/assets/img/worldmap2.jpg'); /* Use the correct path */
    background-size: cover;
    background-position: center;
    padding: 40px;
    color: white;
  }
  
  .page-title {
    text-align: center;
    font-size: 2em;
  }
  
  .form-container {
    background-color: rgba(141, 78, 107, 0.8); /* Purple with transparency */
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  input[name="name"] {
    width: 70%; /* Smanjivanje širine za naziv grada */
  }
  
  textarea {
    resize: vertical;
    height: 100px;
  }
  
  button.submit-btn {
    background-color: #915f6d;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    width: 100%;
  }
  
  button.submit-btn:disabled {
    background-color: #ddd;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  
  .search-container {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .search-bar {
    padding: 10px;
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .cities-list {
    margin-top: 30px;
    width: 80%;
    max-width: 600px;
    margin: 0 auto; /* Centriranje liste gradova */
    text-align: center; /* Centriranje teksta unutar liste */
  }
  
  .city-item {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Poravnava gradove i gumb */
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.7);
    color: var(--primary-dark);
  }
  
  .city-info {
    display: flex;
    align-items: center;
  }
  
  .city-image {
    width: 150px;
    height: 100px;
    margin-right: 20px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .city-details h3 {
    margin: 0;
    font-size: 1.2em;
    color: var(--primary-dark);
  }
  
  .city-details p strong {
    margin: 5px 0;
    font-size: 0.9em;
    color: var(--primary-dark);
  }
  
  .city-details strong {
    color: var(--primary-dark);
  }
  
  .delete-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: var(--primary-dark);
  }
  
  .delete-btn {
    align-self: flex-end; /* Poravnanje na desnu stranu */
  }
  </style>
  