import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);

  const cleanedPhone = phone.replace("+", "");
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${cleanedPhone}`;

  const checkIfConfirmed = async () => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbx3pPIYYnATHzeM95xJKVHVXqbvuOFx3YqyGxJ95mhxwKDfyGM3VM4iQsm8KeaoZKV9/exec?phone=${cleanedPhone}`);
    const data = await res.json();
    return data.confirmed === "1" ? data : null;
  };

  const resetConfirmedFlag = async () => {
    await fetch("https://script.google.com/macros/s/AKfycbx3pPIYYnATHzeM95xJKVHVXqbvuOFx3YqyGxJ95mhxwKDfyGM3VM4iQsm8KeaoZKV9/exec", {
      method: "POST",
      body: JSON.stringify({ phone: cleanedPhone }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const startPolling = () => {
    let attempts = 0;
    const maxAttempts = 12;

    const interval = setInterval(async () => {
      const userData = await checkIfConfirmed();

      if (userData) {
        clearInterval(interval);
        await resetConfirmedFlag();
        setChecking(false);
        alert(`✅ Вхід підтверджено. Вітаємо, ${userData.name}!`);
      } else if (++attempts >= maxAttempts) {
        clearInterval(interval);
        setChecking(false);
        alert("⏳ Час підтвердження вийшов. Спробуйте ще раз.");
      }
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("📱 Введіть номер телефону");
      return;
    }

    const res = await fetch(`https://script.google.com/macros/s/AKfycbx3pPIYYnATHzeM95xJKVHVXqbvuOFx3YqyGxJ95mhxwKDfyGM3VM4iQsm8KeaoZKV9/exec?phone=${cleanedPhone}`);
    const data = await res.json();

    if (data.confirmed === "0") {
      // 🔹 Користувач вже існує, але ще не підтвердив вхід
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: data.userId,
          text: `👋 Вітаємо, ${data.name} ${data.surname}! Натисніть кнопку нижче, щоб підтвердити вхід.`,
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ Підтвердити", callback_data: "comfirmsignIn" }],
            ],
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("📨 Повідомлення надіслано у Telegram");
      } else {
        alert("⚠️ Повідомлення не вдалося надіслати.");
      }

      setChecking(true);
      startPolling();
    } else {
      // 🔹 Користувач ще не зареєстрований → ведемо в Telegram
      setChecking(true);
      window.open(telegramBotLink, "_blank");
      startPolling();
    }
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