import imagenMaiz from "../img/Maiz404.png"
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    const regresar = () =>{
        navigate('/landingPage');
    }

  return (
    <main className="flex items-center justify-center w-full h-screen bg-yellow-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md mx-4">
                <h1 className="text-2xl font-bold mb-4">¡Ohh no grano perdido!</h1>
                
                <img src={imagenMaiz} alt="Grano perdido" className="mx-auto w-24 h-24 mb-4" />
                
                <h2 className="text-xl font-semibold text-gray-600 mb-2">¡404 granos contados!<br />Página no encontrada</h2>
                
                <p className="text-gray-700 mb-6">
                    Nuestro granero virtual está lleno de páginas, pero parece que la que buscas se ha mezclado con los granos.
                    ¿Qué tal si volvemos a la cosecha principal mientras nuestras máquinas siguen buscando?
                </p>
                
                <button onClick={regresar}
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition-colors"
                >
                    Regresar
                </button>
            </div>
        </main>
  )
}
