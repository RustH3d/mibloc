import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await AuthService.register(email, password);
      navigate.push('/login'); // Redirige a la página de inicio de sesión tras registrarse
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
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
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default Registro;
