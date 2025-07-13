import { useEffect, useState, useRef } from 'react';

// Глобальна функція, яка викликається Telegram-виджетом
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
      alert(`✅ Авторизовано як ${userData.first_name}`);
    } else if (result.status === 'unknown') {
      window.location.href = result.startLink;
    }
  } catch (err) {
    console.error('❌ Помилка авторизації:', err);
  }
};

const TelegramLogin = () => {
  const [status, setStatus] = useState('pending');
  const containerRef = useRef(null);

  useEffect(() => {
    const botUsername = process.env.REACT_APP_BOT_USERNAME;
    console.log('🔧 Bot username з env:', botUsername);

    if (!botUsername) {
      console.error('❌ Bot username не знайдено в .env');
      return;
    }

    // Додаємо Telegram скрипт тільки після того, як контейнер точно є
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.async = true;

      containerRef.current.innerHTML = ''; // очищаємо старий скрипт (якщо був)
      containerRef.current.appendChild(script);

      setStatus('waiting');
    } else {
      console.error('❌ Контейнер ще не готовий (ref null)');
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '20px' }}>Авторизація через Telegram</h1>
      <div ref={containerRef} id="telegram-button"></div>
    </div>
  );
};

export default TelegramLogin;