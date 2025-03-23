import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Carga las variables de entorno según el modo actual (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Asegura que las variables de entorno estén disponibles en el código
      'process.env': env
    },
    server: {
      // Configuración opcional del servidor de desarrollo
      port: 5173,
      strictPort: true,
      // Proxy para desarrollo local si es necesario
      proxy: {
        // Ejemplo: '/api': 'http://localhost:4000'
      }
    }
  };
});