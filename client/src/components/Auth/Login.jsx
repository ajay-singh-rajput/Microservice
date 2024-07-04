import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      // Decode token and get user information (you can use jwt-decode library)
      const user = {}; // Decode the token to get user info
      login(user, token);
      window.location.href = '/dashboard'; // Redirect to dashboard
    }
  }, [location, login]);

  return (
    <div>
      <h2>Login</h2>
      <a href="http://localhost:8080/auth/google">Login with Google</a>
    </div>
  );
};

export default Login;
