import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);
  const encodedPhone = `phone_${phone.replace("+", "")}`;
  const telegramBotLink = `https://t.me/fivone_bot?start=${encodedPhone}`;

  const checkIfPhoneExists = async () => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyZFxnZV06pB79oViWrYMGgJwfI4uD-0xpaLb_nHA7oaVC3z3YTd2A9BQoH-bPb-xuw/exec?phone=${phone.replace("+", "")}`);
    const data = await res.json();
    return data.confirmed === "true" || data.confirmed === true;
  };

  const startConfirmationPolling = () => {
    let attempts = 0;
    const maxAttempts = 12; // ~1 хвилина

    const intervalId = setInterval(async () => {
      const exists = await checkIfPhoneExists();

      if (exists) {
        clearInterval(intervalId);
        setChecking(false);
        alert("✅ Реєстрація підтверджена!");
      } else if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        setChecking(false);
        alert("⏳ Час підтвердження вийшов. Спробуйте ще раз.");
      }

      attempts++;
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("📱 Введіть номер телефону");
      return;
    }
  
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyZFxnZV06pB79oViWrYMGgJwfI4uD-0xpaLb_nHA7oaVC3z3YTd2A9BQoH-bPb-xuw/exec?phone=${phone.replace("+", "")}`);
    const data = await res.json();
    console.log(data)
  
    if (data.confirmed) {
      // 🔔 Надсилаємо повідомлення в Telegram
      const text = `👋 Вітаємо, ${data.name} ${data.surname}! Ви вже авторизовані.`;
      const sendUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${data.userId}&text=${encodeURIComponent(text)}`;
  
      try {
        await fetch(sendUrl);
        alert("⚠️ Ви вже авторизовані. Повідомлення надіслано у Telegram.");
      } catch (err) {
        alert("⚠️ Ви вже авторизовані, але не вдалося надіслати повідомлення.");
      }
  
      return;
    }
  
    setChecking(true);
    window.open(telegramBotLink, "_blank");
    startConfirmationPolling();
  };

  return (
    <div style={{ width: "100%", alignItems: "center", paddingTop: "100px", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
        <input
          type="tel"
          placeholder="+380..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />

        <button
          onClick={handleLogin}
          disabled={checking}
          style={{
            textAlign: "center",
            background: "#0088cc",
            color: "#fff",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {checking ? "⏳ Очікуємо підтвердження..." : "Увійти через Telegram"}
        </button>
      </div>
    </div>
  );
};

export default TelegramLogin;