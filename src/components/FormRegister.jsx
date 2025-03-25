import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { ENDPOINTS } from '../config/api'; 

export const FormRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos',
      });
      return;
    }

    try {
      const response = await axios.post(
        ENDPOINTS.REGISTER, 
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.success === true) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/home'); 
      } else {
        throw new Error(response.data.message || 'Error al registrar usuario');
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al registrar usuario',
      });
      console.error('Error:', error);
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-gray-700" htmlFor="name">Nombre Completo</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre Completo"
          className="w-full p-2 border border-black rounded-2xl focus:outline-none focus:border-yellow-500"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="mt-4">
        <label className="text-gray-700" htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo Electrónico"
          className="w-full p-2 border border-black rounded-2xl focus:outline-none focus:border-yellow-500"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-gray-700" htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-2 border border-black rounded-2xl focus:outline-none focus:border-yellow-500"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <button
          type="submit"
          className="w-52 bg-yellow-500 text-white p-2 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
        >
          Registrarse
        </button>
        <button
          type="button"
          className="w-52 mt-4 bg-yellow-300 text-white p-2 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </form>
  );
};
