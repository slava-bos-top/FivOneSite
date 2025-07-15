import React, { useState, useEffect } from "react";

const TelegramLogin = () => {
  const telegramBotLink = `https://t.me/fivone_bot`;

    const sendToTelegram = async () => {
        const response = await fetch("/api/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: 886330407, // ✅ user.id з Telegram
            text: "👋 Привіт з Vercel сайту!",
          }),
        });
      
        const data = await response.json();
        console.log("Result:", data);
      };

  return (
    <div>
      <a href={telegramBotLink} target="_blank" rel="noopener noreferrer">
        Увійти через Telegram
      </a>

      <button onClick={sendToTelegram}>Надіслати повідомлення</button>
    </div>
  );
};

export default TelegramLogin;