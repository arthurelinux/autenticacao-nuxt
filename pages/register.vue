<template>
   <Header/>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <label for="ConfirmPassword">Confirm Password</label>
          <input type="password" v-model="ConfirmPassword" id="ConfirmPassword" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const ConfirmPassword = ref('')
  const router = useRouter()
  
  const register = async () => {
    try {
      const response = await axios.post('https://mymach.acsdev.xyz/api/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: ConfirmPassword.value
      })
  
      if (response.data.success) {
        const token = response.data.data.token
        const userName = response.data.data.name
        alert(`User registered successfully. Welcome, ${userName}!`)
        // Armazene o token no localStorage
        localStorage.setItem('token', token)
        // Redirecione para a página inicial
        router.push('/home')
      } else {
        alert('Registration failed.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      alert('An error occurred during registration.')
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
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