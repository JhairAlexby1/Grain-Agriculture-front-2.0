import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header>
      <h1>Aqui va el contenido del header</h1>
      <button onClick={handleLoginClick}>Boton Para ir al login</button>
    </header>
  );
};