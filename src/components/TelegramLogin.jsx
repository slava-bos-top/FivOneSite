import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const telegramBotLink = "https://t.me/fivone_bot";

  const sendToTelegram = async () => {
    if (!phone) {
      alert("Введіть номер телефону");
      return;
    }
  
    try {
      // 1️⃣ Перевірка номера та збереження (якщо новий)
      const checkRes = await fetch("/api/check-or-save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
  
      const checkData = await checkRes.json();
      console.log("📄 Перевірка номера:", checkData);
  
      // 2️⃣ Формуємо повідомлення
      let message = "";
  
      if (checkData.exists) {
        message = `✅ Ви успішно зайшли у свій кабінет з номером: ${phone}\nПідтвердіть вхід у боті`;
      } else {
        message = `❗ Новий користувач хоче зареєструватись з номером: ${phone}\nПерейдіть у бот /start`;
      }
  
      // 3️⃣ Відправка повідомлення в Telegram
      await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: 886330407,
            text: message,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Перейти до бота",
                    url: telegramBotLink,
                  },
                ],
              ],
            },
        }),
      });
  
    } catch (err) {
      console.error("❌ Помилка:", err);
    }
  };

  return (
    <div style={{width: "100%", alignItems: "center", paddingTop: "100px"}}>
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
    </div>
  );
};

export default TelegramLogin;