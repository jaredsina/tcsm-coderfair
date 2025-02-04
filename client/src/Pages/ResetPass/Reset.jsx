import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reset.css";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (password && passwordConfirm === password) {
      window.alert("Password has been reset");
      navigate("/home");
    } else {
      alert("New Passwords do not match");
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="sign-in-btn">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
