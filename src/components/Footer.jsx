import React from 'react'

export const Footer = () => {
  return (
    <footer className="footer bg-[#8B4A17] text-white py-8 px-4 mt-auto">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      
      <div className="footer-section">
        <h3 className="text-lg font-bold mb-4">Acerca de CornTrack</h3>
        <p className="text-sm">
          Innovando en el monitoreo de granos para agricultores y hogares desde 2024.
        </p>
      </div>
      
      
      <div className="footer-section">
        <h3 className="text-lg font-bold mb-4">Enlaces rápidos</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:underline">Inicio</a></li>
          <li><a href="#" className="hover:underline">Características</a></li>
          <li><a href="#" className="hover:underline">Cómo funciona</a></li>
          <li><a href="#" className="hover:underline">Beneficios</a></li>
        </ul>
      </div>
      
     
      <div className="footer-section">
        <h3 className="text-lg font-bold mb-4">Contacto</h3>
        <p className="text-sm">Email: info@corntrack.com</p>
        <p className="text-sm">Teléfono: (123) 456-7890</p>
      </div>

    </div>
  </footer>
  )
}
