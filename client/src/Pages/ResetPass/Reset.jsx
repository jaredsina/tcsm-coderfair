import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./Reset.css";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (password && passwordConfirm === password) {
      navigate("/");
    } else {
      setShowError(true)
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleChange}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="text"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your new password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          {showError && <p>Passwords do not match</p>}
          <button type="submit" className="sign-in-btn">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
