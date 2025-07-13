//TelegramLogin.jsx

import { useEffect, useState } from 'react';

const TelegramLogin = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('pending');

  const botUsername = process.env.REACT_APP_BOT_USERNAME;

  useEffect(() => {
    // 🔹 Спочатку визначаємо функцію
    window.onTelegramAuth = async (userData) => {
      console.log('✅ Telegram повернув дані користувача:', userData); // 🔍 Додай лог
      try {
        const res = await fetch('/api/verify-and-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
  
        const result = await res.json();
        console.log('📡 Відповідь від verify-and-check:', result);
  
        if (result.status === 'known') {
          setUser(result.user);
          setStatus('authorized');
        } else if (result.status === 'unknown') {
          window.location.href = result.startLink;
          console.log("🔁 unknown, перенаправлення...");
        }
      } catch (err) {
        console.error('❌ Помилка авторизації:', err);
      }
    };
  
    // 🔹 Потім вставляємо скрипт Telegram
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
  
    const container = document.getElementById('telegram-button');
    if (container) container.appendChild(script);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{marginBottom: "20px"}}>Авторизація через Telegram</h1>
      {status === 'authorized' ? (
        <div>
          <h2>Вітаємо, {user.first_name}!</h2>
          <p>@{user.username}</p>
        </div>
      ) : (
        <div id="telegram-button"></div>
      )}
    </div>
  );
};

export default TelegramLogin;
