import React, { useState } from 'react';
import logo from '../assets/school_logo.png';
import background from '../assets/background.png';
import library_img from '../assets/library.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
import { jwtDecode } from 'jwt-decode';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Authenticate and get tokens
      const res = await api.post('/api/token/', { username, password });
      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;

      // Store tokens in localStorage
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      // Step 2: Decode the token to get user_id
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user_id;

      // Step 3: Fetch the current user info using the user_id
      const userInfoRes = await api.get(`/api/users/${userId}/`);
      const userInfo = userInfoRes.data;

      console.log(userInfo);
      

      // Step 4: Navigate based on the user's role
      if (userInfo.role === 'librarian' && location.pathname === "/admin") {
        navigate('/admin/home');  // Redirect to admin dashboard
      } else if (userInfo.role === 'student' && location.pathname === "/user") {
        navigate('/user/home');  // Redirect to student dashboard
      } else {
        alert("Wrong level of access");
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Failed to log in');
    }
  };

  return (
    <div 
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* HEADER */}
      <div className="relative z-10 bg-[#EFEFEF] flex flex-row w-full px-8 justify-between items-center h-40 rounded-b-xl shadow-xl">
        <img src={logo} alt="School Logo" className="h-3/5" />
        <h1 className="text-[#1C528A] text-4xl font-bold">Library Management System Login</h1>
      </div>
      {/* LOGIN PANEL */}
      <div className="flex w-full justify-center items-center z-50" style={{ height: 'calc(100% - 10rem)' }}>
        <div className="bg-[#D8DEE4] flex flex-row justify-between w-7/10 h-7/10 rounded-2xl">
          {/* LEFT IMAGE */}
          <div className="p-8">
            <img src={library_img} alt="Library Image" className="h-full" />
          </div>

          {/* FORM */}
          <div className="bg-[#1C528A] rounded-2xl h-9/10 px-12 py-8 flex flex-col justify-evenly items-center">
            <h1 className="text-[#EFEFEF] text-4xl font-bold">Enter Account Details</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full">
              {/* USERID */}
              <div className="flex flex-col gap-4 w-full">
                <h1 className="text-[#EFEFEF] text-2xl">User ID</h1>
                <input
                  className="text-2xl font-bold rounded-xl outline-none px-2 py-4"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}  // Bind to state
                  placeholder="Enter User ID"
                />
              </div>
              {/* PASSWORD */}
              <div className="flex flex-col gap-4 w-full">
                <h1 className="text-[#EFEFEF] text-2xl">Password</h1>
                <input
                  className="text-2xl font-bold rounded-xl outline-none px-2 py-4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  // Bind to state
                  placeholder="Enter Password"
                />
              </div>
              {/* LOGIN BUTTON */}
              <button type="submit" className="bg-[#488ACF] rounded-xl px-16 py-4 text-[#EFEFEF] text-2xl font-bold">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
