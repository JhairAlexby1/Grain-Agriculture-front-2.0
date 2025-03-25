import React from 'react';
import { FormRegister } from '../components/FormRegister';
import FondoAtras from "../img/FondoAtras.jpg";
import LogoLogin from "../img/LogoLogin.png";

export const RegisterPage = () => {
  return (
    <div>
      <main className="relative w-full h-screen">
        <img src={FondoAtras} alt="Login Background" className="w-full h-full object-cover absolute" />
        <div className="flex items-center justify-center w-full h-full relative">
          <div className="bg-white rounded-lg shadow-lg px-14 py-7">
            <div className="flex justify-center">
              <img src={LogoLogin} alt="Logo" className="w-40" />
            </div>
            <FormRegister />
          </div>
        </div>
      </main>
    </div>
  );
};
