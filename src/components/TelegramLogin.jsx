import { useEffect, useState } from 'react';

// 🟢 ГЛОБАЛЬНА ФУНКЦІЯ авторизації Telegram (має бути ДО компонента)
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
      console.log("🔁 Перенаправлення на startLink...");
      window.location.href = result.startLink;
    } else {
      console.warn('⚠️ Невідомий статус:', result.status);
    }
  } catch (err) {
    console.error('❌ Помилка авторизації:', err);
  }
};

const TelegramLogin = () => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const botUsername = process.env.REACT_APP_BOT_USERNAME;
    console.log('🔧 Bot username з env:', botUsername);

    if (!botUsername) {
      console.error('❌ Bot username не знайдено в .env');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;

    const container = document.getElementById('telegram-button');
    if (container) {
      container.innerHTML = ''; // Очистити попередній скрипт (якщо був)
      container.appendChild(script);
    } else {
      console.error('❌ Не знайдено контейнер з id="telegram-button"');
    }

    setStatus('waiting');
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '20px' }}>Авторизація через Telegram</h1>
      {status === 'waiting' ? (
        <div id="telegram-button"></div>
      ) : (
        <p>⏳ Завантаження віджета...</p>
      )}
    </div>
  );
};

export default TelegramLogin;
