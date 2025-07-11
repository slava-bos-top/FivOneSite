import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { auth } from "../../firebase"; // або "../firebase", залежно від структури
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyxOA_BqhytFq3Se00rLFSsTe2ACJBHKl4lLCBMpeKkqMLR1GTwNv7zF91bowo9o_l/exec";

function Register({ onLoginSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestSms = async (formData) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier);
      window.confirmationResult = confirmation;
      alert("✅ SMS-код надіслано");
    } catch (err) {
      console.error("SMS Error", err);
      alert("❌ Не вдалося надіслати код");
    }
  };

  const handleVerifyCode = async (phone, code) => {
    try {
      const result = await window.confirmationResult.confirm(code);
      return true;
    } catch (err) {
      console.error("Код недійсний:", err);
      return false;
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    fd.append("action", "register");

    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: fd });
      const result = await res.text();
      if (result === "user_saved") {
        onLoginSuccess?.({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        alert("✅ Реєстрація успішна!");
      } else {
        alert("❌ Помилка при реєстрації");
      }
    } catch (err) {
      alert("❌ Запит не вдався");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="register-page">
      <div id="recaptcha-container"></div>
      {!isSubmitting ? (
        <RegisterForm
          onRequestSms={handleRequestSms}
          onVerifyCode={handleVerifyCode}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>⏳ Завантаження...</p>
      )}
    </div>
  );
}

export default Register;