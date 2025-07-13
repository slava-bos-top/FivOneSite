// 🔹 RegisterForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm({ onRequestSms, onVerifyCode, onSubmit }) {

  return (
    <div className="register-form">
      <Link to="/login" className="header_nav_button">Увійти</Link>
    </div>
  );
}

export default RegisterForm;
