import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuth(false);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/isUserAuth', {
          headers: { 'x-access-token': token },
        });
        if (response.data.auth) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log('Error checking authentication', error);
        setAuth(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: loading state while checking auth
  }

  return auth ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
