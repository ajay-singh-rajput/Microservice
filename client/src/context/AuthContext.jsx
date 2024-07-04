import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../helper/config/axiosInstance';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null
  });

  const isUserLogin = async()=>{
    try {
        const {data} = await axiosInstance.get('/auth/login/success');
        console.log(data)
        setAuth({
            isAuthenticated: true,
            user:data.user
          });
    } catch (error) {
        setAuth({
            isAuthenticated: false,
            user: null
          });
        console.log(error)
    }
  }
  
  useEffect(() => {
    isUserLogin()
    console.log('logging')
  
    return () => {
      
    }
  }, [])
  

  const login = (user) => {
    setAuth({
      isAuthenticated: true,
      user
    });
    // localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    });
    // localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
