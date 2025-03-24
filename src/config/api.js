
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

// Endpoints específicos
const ENDPOINTS = {
  // Autenticación
  LOGIN: `${API_BASE_URL}/users/login`,
  LOGOUT: `${API_BASE_URL}/users/logout`,
  CHECK_AUTH: `${API_BASE_URL}/users/check-auth`,
  
  // Sensores
  GRAIN_SENSOR: `${API_BASE_URL}/grain-sensor`,
  
  // Estadísticas
  STATISTICS: `${API_BASE_URL}/statistics`,
  MOVEMENT_PREDICTION: `${API_BASE_URL}/statistics/movement-prediction`,
};

// WebSocket endpoints
const WS_ENDPOINTS = {
  GRAIN_SENSOR: WS_BASE_URL,
};

export { API_BASE_URL, WS_BASE_URL, ENDPOINTS, WS_ENDPOINTS };