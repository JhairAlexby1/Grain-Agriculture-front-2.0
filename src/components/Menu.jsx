import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartPie
} from "react-icons/fa";
import logo from "../img/logo.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/logout",
          {},
          { withCredentials: true } 
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión exitosamente.",
          });
          navigate('/landingPage'); 
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cerrar la sesión.",
        });
      }
    }
  };

  const btnEstadisticas = () => {
    navigate("/graphics");
  };

  const btnDashboard = () => {
    navigate("/home");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 bg-black text-white p-2 rounded"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <FaBars size={24} />
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-800 text-white w-64 flex-shrink-0`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="flex-1">
            <button
              onClick={btnDashboard}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                location.pathname === '/home' ? 'bg-gray-700' : 'hover:bg-gray-600'
              } transition-colors`}
            >
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={btnEstadisticas}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg mt-4 ${
                location.pathname === '/graphics' ? 'bg-gray-700' : 'hover:bg-gray-600'
              } transition-colors`}
            >
              <FaChartPie className="text-xl" />
              <span>Estadísticas</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-600 transition-colors mt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Cerrar Sesión</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;