import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

export const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white w-full">
      <div className="flex-1 text-lg md:text-xl">
        <img src={logo} alt="Logo" className="w-16 h-auto md:w-24" />
      </div>
      <nav className="flex gap-4 flex-wrap justify-around w-full md:w-auto">
        <button onClick={() => scrollToSection('caracteristicas')} className="bg-yellow-100 text-black px-4 py-2 rounded">
          Características
        </button>
        <button onClick={() => scrollToSection('como-funciona')} className="bg-yellow-100 text-black px-4 py-2 rounded">
          Cómo funciona
        </button>
        <button onClick={handleLoginClick} className="text-yellow-500 px-4 py-2 rounded border-none">Iniciar Sesión</button>
      </nav>
    </header>
  );
};
