import { useEffect } from 'react';

// 🔹 Глобальна функція повинна бути оголошена ДО завантаження Telegram скрипта
  window.onTelegramAuth = async (user) => {
    console.log('✅ Telegram User:', user);

    try {
      const res = await fetch('/api/telegram-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      if (result.success) {
        console.log('🎉 Авторизація на бекенді пройшла успішно');
      } else {
        console.error('❌ Авторизація не вдалася:', result.message);
      }
    } catch (err) {
      console.error('❌ Помилка при відправці Telegram-даних:', err);
    }
  };

  window.onTelegramAuth = function(user) {
    console.log('✅ Telegram User:', user);
  };



function TelegramLogin() {
  useEffect(() => {
    window.onTelegramAuth = function(user) {
        console.log('✅ Telegram User:', user);
    };
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', process.env.REACT_APP_BOT_USERNAME); // заміни на свого бота
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth');
    script.async = true;


    const container = document.getElementById('telegram-login-button');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Авторизація через Telegram</h2>
      <div id="telegram-login-button" />
    </div>
  );
}

export default TelegramLogin;