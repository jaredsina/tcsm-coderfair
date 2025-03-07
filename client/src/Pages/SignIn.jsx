import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { Link } from 'react-router-dom';
import {useDispatch} from"react-redux"
import { logIn } from '../reducers/authSlice';
import { useAuth } from '../auth/AuthContext';

const SignIn = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {login} =useAuth();

  const handleSignIn = async(e) => {
    e.preventDefault();
    // Simulated login (Replace with actual authentication logic)
    if (accountName && password) {
      const response = await dispatch(logIn({username:accountName, password:password }))
      
      if (response.payload.refresh_token && response?.payload?.access_token){
        login(response)
        navigate("/"); // Redirect to homepage or dashboard
      }
    } else {
      alert('Please enter account name and password.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label>Account Name</label>
            <input
              type="text"
              placeholder="Enter your account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
          <br />
          <Link to="/reset">Reset Password</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
