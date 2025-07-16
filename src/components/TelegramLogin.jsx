import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const telegramBotLink = "https://t.me/fivone_bot";

  const sendToTelegram = async () => {
    if (!phone) {
      alert("Введіть номер телефону");
      return;
    }

    const response = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: 886330407, // ❗ Тут постав свій userId або збережений з логіки бота
        text: `☎️ Користувач намагається увійти з номером: ${phone}\nПотрібне підтвердження.`,
      }),
    });

    const data = await response.json();
    console.log("Telegram response:", data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
      <input
        type="tel"
        placeholder="+380..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />

      <a
        href={telegramBotLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={sendToTelegram}
        style={{
          textAlign: "center",
          background: "#0088cc",
          color: "#fff",
          padding: "10px",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Увійти через Telegram
      </a>
    </div>
  );
};

export default TelegramLogin;