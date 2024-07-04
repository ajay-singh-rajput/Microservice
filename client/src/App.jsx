import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AuthProvider from './context/AuthContext';
import useAuth from './hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './store/action/userAction';
import Navbar from './layouts/Navbar';
import ComposeEmail from './components/Email/ComposeEmail';
import EmailList from './components/Email/EmailList';
import { connectSocket, onNewMailReceived } from './helper/socket/socket';
import { toast } from 'react-toastify';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const {isAuth} = useSelector(state=>state.UserReducer)
  
  
  return isAuth ? <>
  <Navbar/>
  <Component {...rest} /> 
  </>
  : <Navigate to="/login" />;
};

const App = () => {
  const dispatch =  useDispatch()
  const {isAuth, userData} =  useSelector(state=>state.UserReducer)

  

    useEffect(() => {
        if (isAuth) {
          connectSocket(userData.email)
          onNewMailReceived((item)=>{
            toast.info('New Mail Received');
            dispatch(fetchUserDetails())
          })
        }
    }, [isAuth]);

  useEffect(() => {
    dispatch(fetchUserDetails())
  }, [])
   return (
    <Routes>
      {/* <Route path="/" element={<PrivateRoute element={Home} />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/sendmail" element={<PrivateRoute element={ComposeEmail} />} />
      <Route path="/mails" element={<PrivateRoute element={EmailList} />} />
    </Routes>
  )
};

export default App;
