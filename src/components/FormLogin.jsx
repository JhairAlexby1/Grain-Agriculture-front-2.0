import React from 'react';

export const FormLogin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
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
        >
          Regresar
        </button>
      </div>
    </form>
  );
};
