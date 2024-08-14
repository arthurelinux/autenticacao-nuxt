<template>
      <Header/>
    <div class="login-container">
      <h1>Login</h1>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const login = async () => {
    try {
      const response = await axios.post('https://mymach.acsdev.xyz/api/login', {
        email: email.value,
        password: password.value
      })
      
      if (response.data.success) {
        // Armazenar o token no localStorage
        localStorage.setItem('token', response.data.data.token)
        // Redirecionar para a página inicial após o login bem-sucedido
        router.push('/home')
      } else {
        alert('Credenciais inválidas')
      }
    } catch (error) {
      console.error('Erro durante o login:', error)
      alert('Ocorreu um erro durante o login.')
    }
  }
  </script>
  
  <style scoped>
  .login-container {
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