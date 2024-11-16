import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../img/logo.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
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
          "http://localhost:3000/users/logout"
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión exitosamente.",
            confirmButtonColor: "#F59E0B",
          });
          navigate("/login");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cerrar la sesión.",
          confirmButtonColor: "#F59E0B",
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
            <button onClick={btnDashboard} className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </button>

            <button onClick={btnEstadisticas} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-600 transition-colors mt-4">
              <FaTachometerAlt className="text-xl" />
              <span>Estadisticas</span>
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