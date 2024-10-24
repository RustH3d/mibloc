import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      navigate.push('/notas'); // Redirige a la página de notas tras iniciar sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input 
        type="email" 
        placeholder="Correo electrónico" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default Login;
