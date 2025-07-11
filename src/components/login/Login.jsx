import React from "react";
import LoginForm from "./LoginForm";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyxOA_BqhytFq3Se00rLFSsTe2ACJBHKl4lLCBMpeKkqMLR1GTwNv7zF91bowo9o_l/exec";

function Login({ onLoginSuccess }) {
    const handleLogin = async (phone, password) => {
        try {
          const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              action: 'login',
              phone: phone,
              password: password,
            }),
          });
      
          const result = await res.text();
      
          const data = JSON.parse(result);
          if (data.status === 'success') {
            onLoginSuccess({ firstName: data.name, lastName: data.lastName }); // 🟡 Поля з `doPost`
            return true;
          } else {
            return false;
          }
        } catch (err) {
          console.error('Login failed:', err);
          return false;
        }
      };

  const handleTelegramLogin = () => {
    window.location.href = `https://t.me/YOUR_BOT?start=login`;
  };

  return <LoginForm onLogin={handleLogin} onTelegramLogin={handleTelegramLogin} />;
}

export default Login;