
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const googleAuth = () => {
		window.open(
			`${import.meta.env.VITE_API_URL}/auth/logout`,
			"_self"
		);
	};
  return (
    <div>
    <h1>Welcome to the Communication Platform</h1>
    <div onClick={googleAuth} to="/logout">Logout</div>
    <Link to={'/dashboard'}>Dashboard</Link>
  </div>
  )
}

export default Home
