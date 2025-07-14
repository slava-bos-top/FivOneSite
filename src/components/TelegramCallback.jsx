// TelegramCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TelegramCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(params.entries());

    if (data.hash) {
      console.log('✅ Telegram дані:', data);

      fetch('/api/verify-and-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Auth error');
          }
          return res.json();
        })
        .then(result => {
          console.log('🎉 Авторизація успішна:', result);
          // перенаправлення або збереження
        })
        .catch(err => {
          console.error('❌ Помилка Telegram авторизації:', err.message);
        });
    } else {
      console.warn('⛔ Немає hash — користувач відхилив або не Telegram редирект');
    }
  }, [navigate]);

  return <div>Авторизуємо через Telegram...</div>;
};

export default TelegramCallback;