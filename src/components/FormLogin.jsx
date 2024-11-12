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

    console.log('Datos de inicio de sesión:', { email, password });

    try {
      const response = await axios.post(
        'http://localhost:3000/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Respuesta del servidor:', response);

     
      if ((response.status === 200 || response.status === 201) && response.data) {
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: response.data.message || 'Has iniciado sesión correctamente.',
        }).then(() => {
          navigate('/home'); 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: response.data.message || 'Por favor, verifica tus datos.',
        });
      }
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta del servidor:', error.response);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.response.data.message || 'Error en la respuesta del servidor.',
        });
      } else {
        console.error('Error durante el inicio de sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'Por favor, inténtalo de nuevo más tarde.',
        });
      }
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
