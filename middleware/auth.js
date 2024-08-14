// middleware/auth.js

export default function ({ store, redirect }) {
    // Verifique se o token está presente no localStorage
    const token = localStorage.getItem('token')
    
    // Se o token não estiver presente, redirecione para a página de login
    if (!token) {
      return redirect('/login')
    }
  }