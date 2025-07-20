import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);

  const [loginText, setLoginText] = useState(false);
  const encodedPhone = `phone_${phone.replace("+", "")}`;
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${phone.replace("+", "")}`;

  const checkIfPhoneExists = async () => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone.replace("+", "")}`);
    const data = await res.json();
    return data.confirmed === "true" || data.confirmed === true;
  };

  const startConfirmationPolling = () => {
    let attempts = 0;
    const maxAttempts = 50; // ~1 хвилина

    const intervalId = setInterval(async () => {
      const exists = await checkIfPhoneExists();

      if (exists) {
        const checkRes = await fetch(
          `https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone.replace("+", "")}`
        );
        const checkData = await checkRes.json();
        clearInterval(intervalId);
        setChecking(false);
        localStorage.setItem("user", JSON.stringify({
          name: checkData.name,
          surname: checkData.surname,
          photo: checkData.photo,
          maraphone1: checkData.maraphone1,
          maraphone2: checkData.maraphone2,
          maraphone3: checkData.maraphone3,
          maraphone4: checkData.maraphone4,
          maraphone5: checkData.maraphone5,
          week1: checkData.week1,    
          week2: checkData.week2,   
          week3: checkData.week3,   
          week4: checkData.week4,   
          week5: checkData.week5,   
          week6: checkData.week6,   
          week7: checkData.week7,   
          week8: checkData.week8,   
          week9: checkData.week9,   
          week10: checkData.week10,   
          week11: checkData.week11,   
          week12: checkData.week12,   
          week13: checkData.week13,   
          isLoggedIn: true,
        }));

        window.location.href = "https://fiv-one-site.vercel.app/statistics";
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
  
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone.replace("+", "")}`);
    const data = await res.json();
  
    if (data.confirmed) {
      console.log(data.confirmed)
      setLoginText(true)
      // Надсилання повідомлення через наш API
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
  
      if (!result.success) {
        alert("⚠️ Ви вже авторизовані, але повідомлення не надіслано.");
        return;
      }

      console.log("🔄 Очікуємо підтвердження у Telegram...");

        // ⏳ Перевіряємо кожні 3 секунди колонку F
      const intervalId = setInterval(async () => {
        const checkRes = await fetch(
            `https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone.replace("+", "")}`
        );
        const checkData = await checkRes.json();
        console.log(checkData)
        const normalizedPhone = phone.replace("+", "")

        // Якщо колонка F = 1
        if (checkData.number === "1" || checkData.number === 1) {
            clearInterval(intervalId); // зупиняємо перевірку

            // alert(`✅ Вхід підтверджено! Вітаємо, ${checkData.name} ${checkData.surname}`);

            // 🔄 (Необов’язково) оновлюємо колонку F на "0", якщо маєш API для цього
            await fetch("/api/set-confirmed-zero", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone: normalizedPhone,
                action: "resetConfirmed",
              }),
            });

            localStorage.setItem("user", JSON.stringify({
              name: checkData.name,
              surname: checkData.surname,
              phone: checkData.phone,
              photo: checkData.photo,
              maraphone1: checkData.maraphone1,
              maraphone2: checkData.maraphone2,
              maraphone3: checkData.maraphone3,
              maraphone4: checkData.maraphone4,
              maraphone5: checkData.maraphone5,
              week1: checkData.week1,    
              week2: checkData.week2,   
              week3: checkData.week3,   
              week4: checkData.week4,   
              week5: checkData.week5,   
              week6: checkData.week6,   
              week7: checkData.week7,   
              week8: checkData.week8,   
              week9: checkData.week9,   
              week10: checkData.week10,   
              week11: checkData.week11,   
              week12: checkData.week12,   
              week13: checkData.week13, 
              isLoggedIn: true,
            }));

            window.location.href = "https://fiv-one-site.vercel.app/statistics";

            // Далі можна зберегти в локальне сховище або перейти на іншу сторінку
            // Можна зробити навігацію або збереження
            // localStorage.setItem('user', JSON.stringify(checkData));
            // router.push('/dashboard');

        }
      }, 3000); 
  
      return;
    }
  
    // Якщо не зареєстрований — відкриваємо Telegram
    setChecking(true);
    window.open(telegramBotLink, "_blank");
    startConfirmationPolling();
  };

  const isLoading = checking || loginText;

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(145deg, #e1f3ff, #ffce07, #f3faff)"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        maxWidth: "400px",
        transition: "all 0.3s ease"
      }}>
    
        {/* 🔸 Привітальний текст */}
        <div style={{
          backgroundColor: "#FFCE07", 
          opacity: 0.7,
          padding: "15px",
          borderRadius: "10px",
          textAlign: "center",
          color: "#00",
          fontWeight: 500,
          fontSize: "15px",
          lineHeight: "1.4"
        }}>
          Раді бачити тебе серед потенційних студентів наших освітніх програм! Залишилось лише зареєструватися і почати безкоштовно користуватися всіма можливостями, які надає <strong>FivOnе</strong>. Після того, як ти введеш номер телефону до якого прив'язаний телеграм, сторінка перенаправить тебе в наш Месенджер <strong>Telegram</strong>. А далі – просто крокуй за нашим ботом, отримуй нові знання та ставай частиною <strong>FivOnе</strong>!
        </div>
    
        <h2 style={{ color: "#0088cc", marginBottom: "10px" }}>Вхід через Telegram</h2>
    
        <input
          type="tel"
          placeholder="+380..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "0.2s",
          }}
        />
    
        {isLoading ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="loader" />
            <p style={{ margin: 0, color: "#333" }}>Очікуємо підтвердження у Telegram...</p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Перейдіть до&nbsp;
              <a href="https://t.me/fivone_bot" target="_blank" rel="noreferrer" style={{ color: "#000" }}>
                @fivone_bot
              </a>
            </p>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            disabled={!phone.trim()}
            style={{
              width: "100%",
              textAlign: "center",
              background: "#0088cc",
              color: "#fff",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              opacity: !phone.trim() ? 0.5 : 1,
            }}
          >
            Продовжити у Telegram
          </button>
        )}
      </div>
    
      {/* Loader CSS */}
      <style>{`
        .loader {
          width: 30px;
          height: 30px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0088cc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
    
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TelegramLogin;