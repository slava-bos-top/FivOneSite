// 🔹 RegisterForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm({ onRequestSms, onVerifyCode, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    password: "",
    consent: false,
  });
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const { firstName, lastName, age, phone, password, consent } = formData;
    if (!firstName || !lastName || !age || !phone || !password || !consent) {
      setError("Будь ласка, заповніть усі поля та дайте згоду.");
      return false;
    }
    if (!/\+380\d{9}/.test(phone)) {
      setError("Невірний формат телефону.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validate()) return;
      try {
        await onRequestSms(formData);
        setStep(2);
      } catch {
        setError("Не вдалося надіслати SMS");
      }
    } else {
      const isValid = await onVerifyCode(formData.phone, code);
      if (isValid) {
        onSubmit(formData);
      } else {
        setError("Невірний код");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Реєстрація</h2>
      {error && <div className="form-error">{error}</div>}

      {step === 1 ? (
        <>
          <label>Ім’я:<input name="firstName" value={formData.firstName} onChange={handleChange} /></label>
          <label>Прізвище:<input name="lastName" value={formData.lastName} onChange={handleChange} /></label>
          <label>Вік:<input name="age" type="number" value={formData.age} onChange={handleChange} /></label>
          <label>Телефон:<input name="phone" value={formData.phone} onChange={handleChange} placeholder="+380..." /></label>
          <label>Пароль:<input name="password" type="password" value={formData.password} onChange={handleChange} /></label>
          <label className="checkbox-label">
            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} /> Згода на обробку даних
          </label>
        </>
      ) : (
        <label>Код підтвердження:<input value={code} onChange={(e) => setCode(e.target.value)} /></label>
      )}

      <button type="submit">
        {step === 1 ? "Надіслати код" : "Підтвердити та зареєструватись"}
      </button>
      <Link to="/login" className="header_nav_button">Увійти</Link>
    </form>
  );
}

export default RegisterForm;
