import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Registro from './components/Registro';
import Notas from './components/Notas';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/" element={<Login />} /> {/* Redirige a Login por defecto */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


