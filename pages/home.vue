<template>
    <Header/>
    <div class="home-container">
      <h1>Usuários</h1>
      <button @click="logout">Logout</button>
      <div v-if="user">
        <p>Welcome, {{ user.name }}!</p>
        <p>Email: {{ user.email }}</p>
        <p>Account Type: {{ user.type === 1 ? 'Admin' : 'User' }}</p>
        <p>Created At: {{ new Date(user.created_at).toLocaleString() }}</p>
        <p>Updated At: {{ new Date(user.updated_at).toLocaleString() }}</p>
       
      </div>
      <div v-else>
        <p>Loading user data...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const user = ref(null)
  const router = useRouter()
  
  const fetchUserData = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.get('https://mymach.acsdev.xyz/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        user.value = response.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    } else {
      console.error('No token found in localStorage')
        router.push('/login')
    }
  }
  
  const logout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.post('https://mymach.acsdev.xyz/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.data.success) {
          alert(response.data.message)
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          alert('Logout failed.')
        }
      } catch (error) {
        console.error('Error during logout:', error)
        alert('An error occurred during logout.')
      }
    } else {
      console.error('No token found in localStorage')
    }
  }
  
  onMounted(() => {
    fetchUserData()
  })
  </script>
  
  <script>
  export default {
    middleware: 'auth'
  }
  </script>
  
  <style scoped>
  .home-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  p {
    margin: 10px 0;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>