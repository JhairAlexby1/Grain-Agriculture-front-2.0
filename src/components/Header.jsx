import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" className="w-20 h-auto md:w-32 transition-transform hover:scale-105" />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={() => scrollToSection('caracteristicas')}
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            >
              Cómo funciona
            </button>
            <button
              onClick={handleLoginClick}
              className="ml-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </button>
          </nav>
        </div>

        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-b-lg shadow-lg">
            <button
              onClick={() => scrollToSection('caracteristicas')}
              className="block w-full px-3 py-2 text-gray-700 rounded-md hover:bg-yellow-100 transition-colors duration-200"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="block w-full px-3 py-2 text-gray-700 rounded-md hover:bg-yellow-100 transition-colors duration-200"
            >
              Cómo funciona
            </button>
            <button
              onClick={handleLoginClick}
              className="block w-full px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};