import React, { useState } from "react";

const TelegramLogin = () => {
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);

  const [countryCode, setCountryCode] = useState("+380"); // код країни
  const [fullPhone, setFullPhone] = useState("");

  const [loginText, setLoginText] = useState(false);
  const [registrationLink, setRegistrationLink] = useState(false);
  const encodedPhone = `phone_${phone.replace("+", "")}`;
  const telegramBotLink = `https://t.me/fivone_bot?start=confirm_${phone.replace("+", "")}`;

  const checkIfPhoneExists = async () => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyNKzfJN-ghkSbcBCXhMzow-GZeQ81JTrdzZgZ9AUqQRaierqDTddPxuupT2bdj7M_q/exec?phone=${phone.replace("+", "")}`);
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
            <option value="+1">Канада (+1)</option>
            <option value="+1">Сполучені Штати Америки (+1)</option>
            <option value="+1242">Багамські острови (+1242)</option>
            <option value="+1246">Барбадос (+1246)</option>
            <option value="+1264">Англія (+1264)</option>
            <option value="+1268">Антигуа і Барбуда (+1268)</option>
            <option value="+1284">Британські Віргінські острови (+1284)</option>
            <option value="+1340">Американські Віргінські острови (+1340)</option>
            <option value="+1345">Кайманові острови (+1345)</option>
            <option value="+1441">Бермудські острови (+1441)</option>
            <option value="+1473">Гренада (+1473)</option>
            <option value="+1664">Монтсеррат (+1664)</option>
            <option value="+1670">Північні Маріанські острови (+1670)</option>
            <option value="+1671">Ґуам (+1671)</option>
            <option value="+1758">Сент-Люсія (+1758)</option>
            <option value="+1767">Домініка (+1767)</option>
            <option value="+1784">Сент-Вінсент і Гренадіни (+1784)</option>
            <option value="+1787">Пуерто-Ріко (+1787)</option>
            <option value="+1808">Гавайські острови (+1808)</option>
            <option value="+1829">Домініканська Республіка (+1829)</option>
            <option value="+1868">Тринідад і Тобаго (+1868)</option>
            <option value="+1869">Сент-Кітс і Невіс (+1869)</option>
            <option value="+1876">Ямайка (+1876)</option>
            <option value="+20">Єгипет (+20)</option>
            <option value="+212">Марокко (+212)</option>
            <option value="+213">Алжир (+213)</option>
            <option value="+216">Туніс (+216)</option>
            <option value="+218">Лівія (+218)</option>
            <option value="+220">Гамбія (+220)</option>
            <option value="+221">Сенегал (+221)</option>
            <option value="+222">Мавританія (+222)</option>
            <option value="+223">Малі (+223)</option>
            <option value="+224">Гвінея (+224)</option>
            <option value="+225">Кот-д'Івуар (+225)</option>
            <option value="+226">Буркіна-Фасо (+226)</option>
            <option value="+227">Нігер (+227)</option>
            <option value="+228">Того (+228)</option>
            <option value="+229">Бенін (+229)</option>
            <option value="+230">Маврикій (+230)</option>
            <option value="+231">Ліберія (+231)</option>
            <option value="+232">Сьєрра-Леоне (+232)</option>
            <option value="+233">Гана (+233)</option>
            <option value="+234">Нігерія (+234)</option>
            <option value="+235">Чад (+235)</option>
            <option value="+236">Центральноафриканська Республіка (+236)</option>
            <option value="+237">Камерун (+237)</option>
            <option value="+238">Кабо-Верде (+238)</option>
            <option value="+239">Сан-Томе і Принсіпі (+239)</option>
            <option value="+240">Екваторіальна Гвінея (+240)</option>
            <option value="+241">Габон (+241)</option>
            <option value="+242">Республіка Конго (+242)</option>
            <option value="+243">Демократична Республіка Конго (+243)</option>
            <option value="+244">Ангола (+244)</option>
            <option value="+245">Гвінея-Бісау (+245)</option>
            <option value="+248">Сейшельські острови (+248)</option>
            <option value="+249">Судан (+249)</option>
            <option value="+250">Руанда (+250)</option>
            <option value="+251">Ефіопія (+251)</option>
            <option value="+252">Сомалі (+252)</option>
            <option value="+253">Джибуті (+253)</option>
            <option value="+254">Кенія (+254)</option>
            <option value="+255">Танзанія (+255)</option>
            <option value="+256">Уганда (+256)</option>
            <option value="+257">Бурунді (+257)</option>
            <option value="+258">Мозамбік (+258)</option>
            <option value="+260">Замбія (+260)</option>
            <option value="+261">Мадагаскар (+261)</option>
            <option value="+263">Зімбабве (+263)</option>
            <option value="+264">Намібія (+264)</option>
            <option value="+265">Малаві (+265)</option>
            <option value="+266">Лесото (+266)</option>
            <option value="+267">Ботсвана (+267)</option>
            <option value="+268">Есватіні (+268)</option>
            <option value="+269">Коморські острови (+269)</option>
            <option value="+27">ПАР (+27)</option>
            <option value="+30">Греція (+30)</option>
            <option value="+31">Нідерланди (+31)</option>
            <option value="+32">Бельгія (+32)</option>
            <option value="+33">Франція (+33)</option>
            <option value="+34">Іспанія (+34)</option>
            <option value="+39">Італія (+39)</option>
            <option value="+40">Румунія (+40)</option>
            <option value="+41">Швейцарія (+41)</option>
            <option value="+43">Австрія (+43)</option>
            <option value="+44">Великобританія (+44)</option>
            <option value="+45">Данія (+45)</option>
            <option value="+46">Швеція (+46)</option>
            <option value="+47">Норвегія (+47)</option>
            <option value="+48">Польща (+48)</option>
            <option value="+49">Німеччина (+49)</option>
            <option value="+51">Перу (+51)</option>
            <option value="+52">Мексика (+52)</option>
            <option value="+54">Аргентина (+54)</option>
            <option value="+55">Бразилія (+55)</option>
            <option value="+56">Чилі (+56)</option>
            <option value="+57">Колумбія (+57)</option>
            <option value="+58">Венесуела (+58)</option>
            <option value="+60">Малайзія (+60)</option>
            <option value="+61">Австралія (+61)</option>
            <option value="+62">Індонезія (+62)</option>
            <option value="+63">Філіппіни (+63)</option>
            <option value="+64">Нова Зеландія (+64)</option>
            <option value="+65">Сінгапур (+65)</option>
            <option value="+66">Таїланд (+66)</option>
            <option value="+81">Японія (+81)</option>
            <option value="+82">Південна Корея (+82)</option>
            <option value="+84">В'єтнам (+84)</option>
            <option value="+90">Туреччина (+90)</option>
            <option value="+91">Індія (+91)</option>
            <option value="+92">Пакистан (+92)</option>
            <option value="+94">Шрі-Ланка (+94)</option>
            <option value="+95">М'янма (+95)</option>
            <option value="+971">Об'єднані Арабські Емірати (+971)</option>
            <option value="+972">Ізраїль (+972)</option>
            <option value="+973">Бахрейн (+973)</option>
            <option value="+974">Катар (+974)</option>
            <option value="+975">Бутан (+975)</option>
            <option value="+977">Непал (+977)</option>
            <option value="+98">Іран (+98)</option>
            <option value="+992">Таджикистан (+992)</option>
            <option value="+994">Азербайджан (+994)</option>
            <option value="+995">Грузія (+995)</option>
            <option value="+996">Киргизстан (+996)</option>
            <option value="+998">Узбекистан (+998)</option>
            <option value="+380">Україна (+380)</option>
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