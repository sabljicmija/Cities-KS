import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref(null)
  const cities = ref([])  // Dodao gradove ovdje

  const addCity = (city) => {
    cities.value.push(city)
  }

  const removeCity = (cityId) => {
    cities.value = cities.value.filter(city => city.id !== cityId)
  }

  return {
    currentUser,
    cities,  // Dodao cities kao state
    addCity,
    removeCity
  }
})
