import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);

  const [countryCode, setCountryCode] = useState("+380"); // код країни
  const [fullPhone, setFullPhone] = useState("");

  const [loginText, setLoginText] = useState(false);
  const [registrationLink, setRegistrationLink] = useState(false);
  const encodedPhone = `phone_${phone.replace("+", "")}`;
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${fullPhone.replace("+", "")}`;

  const checkIfPhoneExists = async () => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${fullPhone.replace("+", "")}`);
    const data = await res.json();
    return data.confirmed === "true" || data.confirmed === true;
  };

  const startConfirmationPolling = () => {
    setRegistrationLink(true)
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

    if (phone.length < 7) {
      alert("Введіть коректний номер телефону");
      return;
    }
    setFullPhone(`${countryCode}${phone}`);
  
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${fullPhone.replace("+", "")}`);
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
            `https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${fullPhone.replace("+", "")}`
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
    
        <h2 style={{ color: "#0088cc", marginBottom: "10px" }}>Вхід через Telegram</h2>
    
         {/* Вибір коду країни + поле телефону */}
         <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
          }}
        >
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "35%",
              background: "#f9f9f9",
            }}
          >
            <option value="+1">+1 Канада</option>
            <option value="+1">+1 Сполучені Штати Америки</option>
            <option value="+1242">+1242 Багамські острови</option>
            <option value="+1246">+1246 Барбадос</option>
            <option value="+1264">+1264 Англія</option>
            <option value="+1268">+1268 Антигуа і Барбуда</option>
            <option value="+1284">+1284 Британські Віргінські острови</option>
            <option value="+1340">+1340 Американські Віргінські острови</option>
            <option value="+1345">+1345 Кайманові острови</option>
            <option value="+1441">+1441 Бермудські острови</option>
            <option value="+1473">+1473 Гренада</option>
            <option value="+1664">+1664 Монтсеррат</option>
            <option value="+1670">+1670 Північні Маріанські острови</option>
            <option value="+1671">+1671 Ґуам</option>
            <option value="+1758">+1758 Сент-Люсія</option>
            <option value="+1767">+1767 Домініка</option>
            <option value="+1784">+1784 Сент-Вінсент і Гренадіни</option>
            <option value="+1787">+1787 Пуерто-Ріко</option>
            <option value="+1808">+1808 Гавайські острови</option>
            <option value="+1829">+1829 Домініканська Республіка</option>
            <option value="+1868">+1868 Тринідад і Тобаго</option>
            <option value="+1869">+1869 Сент-Кітс і Невіс</option>
            <option value="+1876">+1876 Ямайка</option>
            <option value="+20">+20 Єгипет</option>
            <option value="+212">+212 Марокко</option>
            <option value="+213">+213 Алжир</option>
            <option value="+216">+216 Туніс</option>
            <option value="+218">+218 Лівія</option>
            <option value="+221">+221 Сенегал</option>
            <option value="+225">+225 Кот-д'Івуар</option>
            <option value="+230">+230 Маврикій</option>
            <option value="+234">+234 Нігерія</option>
            <option value="+244">+244 Ангола</option>
            <option value="+250">+250 Руанда</option>
            <option value="+254">+254 Кенія</option>
            <option value="+255">+255 Танзанія</option>
            <option value="+256">+256 Уганда</option>
            <option value="+260">+260 Замбія</option>
            <option value="+263">+263 Зімбабве</option>
            <option value="+30">+30 Греція</option>
            <option value="+31">+31 Нідерланди</option>
            <option value="+32">+32 Бельгія</option>
            <option value="+33">+33 Франція</option>
            <option value="+34">+34 Іспанія</option>
            <option value="+36">+36 Угорщина</option>
            <option value="+39">+39 Італія</option>
            <option value="+40">+40 Румунія</option>
            <option value="+41">+41 Швейцарія</option>
            <option value="+43">+43 Австрія</option>
            <option value="+44">+44 Великобританія</option>
            <option value="+45">+45 Данія</option>
            <option value="+46">+46 Швеція</option>
            <option value="+47">+47 Норвегія</option>
            <option value="+48">+48 Польща</option>
            <option value="+49">+49 Німеччина</option>
            <option value="+52">+52 Мексика</option>
            <option value="+54">+54 Аргентина</option>
            <option value="+55">+55 Бразилія</option>
            <option value="+56">+56 Чилі</option>
            <option value="+57">+57 Колумбія</option>
            <option value="+58">+58 Венесуела</option>
            <option value="+60">+60 Малайзія</option>
            <option value="+61">+61 Австралія</option>
            <option value="+62">+62 Індонезія</option>
            <option value="+63">+63 Філіппіни</option>
            <option value="+64">+64 Нова Зеландія</option>
            <option value="+65">+65 Сінгапур</option>
            <option value="+66">+66 Таїланд</option>
            <option value="+81">+81 Японія</option>
            <option value="+82">+82 Південна Корея</option>
            <option value="+84">+84 В’єтнам</option>
            <option value="+90">+90 Туреччина</option>
            <option value="+91">+91 Індія</option>
            <option value="+94">+94 Шрі-Ланка</option>
            <option value="+95">+95 М’янма</option>
            <option value="+971">+971 ОАЕ</option>
            <option value="+972">+972 Ізраїль</option>
            <option value="+973">+973 Бахрейн</option>
            <option value="+974">+974 Катар</option>
            <option value="+975">+975 Бутан</option>
            <option value="+977">+977 Непал</option>
            <option value="+992">+992 Таджикистан</option>
            <option value="+994">+994 Азербайджан</option>
            <option value="+995">+995 Грузія</option>
            <option value="+996">+996 Киргизстан</option>
            <option value="+998">+998 Узбекистан</option>
            <option value="+380">+380 Україна</option>
          </select>

          <input
            type="tel"
            placeholder="номер без коду"
            value={phone}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              if (cleaned.length <= 12) setPhone(cleaned);
            }}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>
    
        {isLoading ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div className="loader" />
            <p style={{ margin: 0, color: "#333" }}>Очікуємо підтвердження у Telegram...</p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Перейдіть до&nbsp;
              {registrationLink ? (
                <a href={telegramBotLink} target="_blank" rel="noreferrer" style={{ color: "#000" }}>
                  @fivone_bot
                </a>
              ) : (
                <a href="https://t.me/fivone_bot" target="_blank" rel="noreferrer" style={{ color: "#000" }}>
                  @fivone_bot
                </a>
              )}
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