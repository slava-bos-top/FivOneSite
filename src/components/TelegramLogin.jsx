import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);

  // Формуємо посилання на Telegram-бота із параметром підтвердження
  const sanitizedPhone = phone.replace(/\D/g, ""); // Вилучаємо все крім цифр
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${sanitizedPhone}`;

  // URL до Google Apps Script
  const GAS_URL = "https://script.google.com/macros/s/AKfycbzolGVu6tTFmKCabwpk-gpqoKY9NxwqyYzt4uVr5AOLtI6474Y_oOe5x8NuJcvV1jka/exec";

  // Перевірка, чи підтверджений номер у базі (confirmed == 1)
  const checkIfConfirmed = async () => {
    try {
      const res = await fetch(`${GAS_URL}?phone=${sanitizedPhone}`);
      if (!res.ok) throw new Error("Помилка мережі");
      const data = await res.json();
      return data.confirmed === "1" || data.confirmed === 1;
    } catch (error) {
      console.error("Помилка при перевірці підтвердження:", error);
      return false;
    }
  };

  // Скидання статусу confirmed в 0 (після успішного входу)
  const resetConfirmed = async () => {
    try {
      await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: sanitizedPhone,
          resetConfirmed: true,
        }),
      });
    } catch (error) {
      console.error("Помилка при скиданні підтвердження:", error);
    }
  };

  // Опитування сервера кожні 5 секунд, щоб дізнатись про підтвердження
  const startConfirmationPolling = () => {
    let attempts = 0;
    const maxAttempts = 60; // 5 хвилин (60 разів по 5 секунд)

    const intervalId = setInterval(async () => {
      const confirmed = await checkIfConfirmed();

      if (confirmed) {
        clearInterval(intervalId);
        setChecking(false);
        alert("✅ Реєстрація підтверджена!");
        await resetConfirmed();
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        setChecking(false);
        alert("⏳ Час підтвердження вийшов. Спробуйте ще раз.");
      }
    }, 5000);
  };

  // Обробник кнопки "Увійти через Telegram"
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!sanitizedPhone) {
      alert("📱 Введіть номер телефону");
      return;
    }

    try {
      const res = await fetch(`${GAS_URL}?phone=${sanitizedPhone}`);
      if (!res.ok) throw new Error("Помилка мережі");
      const data = await res.json();

      if (data.confirmed === "0" || data.confirmed === 0) {
        // Відправляємо повідомлення-нагадування у Telegram
        const response = await fetch("/api/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: data.userId,
            text: `👋 Привіт, ${data.name} ${data.surname}! Будь ласка, підтвердіть вхід у Telegram-боті.`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Підтвердити",
                    callback_data: "confirmSignIn",
                  },
                ],
              ],
            },
          }),
        });

        const result = await response.json();

        if (result.success) {
          alert("⚠️ Вам надіслано повідомлення для підтвердження у Telegram.");
        } else {
          alert("⚠️ Не вдалося надіслати повідомлення у Telegram.");
        }
      } else if (data.confirmed === "1" || data.confirmed === 1) {
        alert("✅ Ваш вхід вже підтверджено.");
        return;
      } else if (data.confirmed === false) {
        // Якщо номеру немає у базі — просто відкриваємо бот (перше підтвердження)
        alert("⚠️ Номер не знайдено. Перейдіть у Telegram для підтвердження.");
      }

      setChecking(true);
      window.open(telegramBotLink, "_blank");
      startConfirmationPolling();

    } catch (error) {
      console.error("Помилка при логіні:", error);
      alert("❌ Сталася помилка, спробуйте пізніше.");
    }
  };

  return (
    <div style={{ width: "100%", alignItems: "center", paddingTop: 100, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
        <input
          type="tel"
          placeholder="+380..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />

        <button
          onClick={handleLogin}
          disabled={checking}
          style={{
            textAlign: "center",
            background: "#0088cc",
            color: "#fff",
            padding: 10,
            borderRadius: 6,
            border: "none",
            cursor: checking ? "wait" : "pointer",
          }}
        >
          {checking ? "⏳ Очікуємо підтвердження..." : "Увійти через Telegram"}
        </button>
      </div>
    </div>
  );
};

export default TelegramLogin;