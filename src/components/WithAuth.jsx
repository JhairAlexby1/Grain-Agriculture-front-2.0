import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users/check-auth', { withCredentials: true });
          if (response.status !== 200) {
            throw new Error('Not authenticated');
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Acceso denegado',
              text: 'No tienes permiso para estar aquí',
              confirmButtonText: 'Regresar',
              confirmButtonColor: '#F59E0B',
            }).then(() => {
              navigate('/landingPage');
            });
          } else {
            console.error('Error checking authentication', error);
          }
        }
      };

      checkAuth();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;