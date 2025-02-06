import React from 'react';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  return (
    <div ClassName="reset-password-container">
      <div ClassName="reset-password-card">
        <label>New Password</label>
        <input type="text" placeholder="Enter a new password" />
        <input type="text" placeholder="Confirm password" />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
