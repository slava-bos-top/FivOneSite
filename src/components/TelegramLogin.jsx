import { useEffect, useState, useRef } from 'react';

const TelegramLogin = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('pending');
  const telegramButtonRef = useRef(null); // ✅ створюємо посилання на div

  const botUsername = process.env.REACT_APP_BOT_USERNAME;

  // 🔹 Глобальна функція для обробки Telegram авторизації
  useEffect(() => {
    console.log('🧪 typeof window.onTelegramAuth =', typeof window.onTelegramAuth);
    if (!botUsername) {
      console.error('❌ BOT_USERNAME не задано у .env');
      return;
    }
  
    // 🔹 Спочатку визначаємо глобальну функцію
    window.onTelegramAuth = async (userData) => {
      console.log('✅ Telegram повернув дані користувача:', userData);
  
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
        }
      } catch (err) {
        console.error('❌ Помилка авторизації:', err);
      }
    };
  
    // 🔹 Потім додаємо Telegram-скрипт
    if (telegramButtonRef.current) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'onTelegramAuth');
      script.async = true;
  
      telegramButtonRef.current.innerHTML = ''; // Очистка
      telegramButtonRef.current.appendChild(script);
  
      console.log('✅ Telegram script додано в контейнер');
    } else {
      console.error('❌ Контейнер telegramButtonRef не знайдено');
    }
  
    // 🔹 Очистка (на випадок повторного монтування)
    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '20px' }}>Авторизація через Telegram</h1>
      {status === 'authorized' && user ? (
        <div>
          <h2>Вітаємо, {user.first_name}!</h2>
          <p>@{user.username}</p>
        </div>
      ) : (
        <div ref={telegramButtonRef} />
      )}
    </div>
  );
};

export default TelegramLogin;
