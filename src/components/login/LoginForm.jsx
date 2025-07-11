import { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin, onTelegramLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) return setError("Введіть номер і пароль");

    const success = await onLogin(phone, password);
    if (!success) setError("❌ Невірні дані");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Вхід</h2>
      {error && <div className="form-error">{error}</div>}

      <label>Телефон: <input value={phone} onChange={e => setPhone(e.target.value)} /></label>
      <label>Пароль: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>

      <button type="submit">Увійти</button>

      <p>або</p>

      <button type="button" onClick={onTelegramLogin}>Увійти через Telegram</button>
    </form>
  );
}

export default LoginForm;