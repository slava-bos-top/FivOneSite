import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);
  const encodedPhone = `phone_${phone.replace("+", "")}`;
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${phone.replace("+", "")}`;
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwQpwZqbebaPZ8ohiz5BguOgUanuuSPpCyqkOa7AqS6Oy1eD7yEd_IzCCmhaDuZY8s/exec";

  const checkIfPhoneExists = async () => {
    const res = await fetch(`${GAS_URL}?phone=${phone.replace("+", "")}`);
    const data = await res.json();
    return data.confirmed === "1" || data.confirmed === 1;
  };

  const resetConfirmed = async () => {
    await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone.replace("+", ""),
        resetConfirmed: true,
      }),
    });
  };

  const startConfirmationPolling = () => {
    let attempts = 0;
    const maxAttempts = 60; // 5 хв = 60 спроб по 5 секунд

    const intervalId = setInterval(async () => {
      const confirmed = await checkIfPhoneExists();

      if (confirmed) {
        clearInterval(intervalId);
        setChecking(false);
        alert("✅ Реєстрація підтверджена!");
        await resetConfirmed();
        return;
      }

      if (attempts >= maxAttempts) {
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

    const res = await fetch(`${GAS_URL}?phone=${phone.replace("+", "")}`);
    const data = await res.json();

    if (data.confirmed === "1" || data.confirmed === 1) {
      // Надсилаємо повідомлення
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: data.userId,
          text: `👋 Вітаємо, ${data.name} ${data.surname}! Ви вже авторизовані.`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Підтвердити",
                  callback_data: "comfirmsignIn",
                },
              ],
            ],
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("⚠️ Ви вже авторизовані. Повідомлення надіслано у Telegram.");
      } else {
        alert("⚠️ Ви вже авторизовані, але повідомлення не надіслано.");
      }
    }

    // Відкрити Telegram-бота і запустити polling
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