import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 

export const FormLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos',
      });
      return;
    }
  
    try {
      const response = await axios.post(
        'https://grainagricultureapi.integrador.xyz/users/login',
        { email, password },
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
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/home');
      } else {
        throw new Error(response.data.message || 'Credenciales inválidas');
      }
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al iniciar sesión',
      });
      console.error('Error:', error);
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-gray-700" htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full p-2 border border-black rounded-2xl focus:outline-none focus:border-yellow-500"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700" htmlFor="password">Contraseña</label>
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
          Iniciar Sesión
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
