//TelegramLogin.jsx

import { useEffect, useState } from 'react';

const TelegramLogin = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('pending');

  const botUsername = process.env.REACT_APP_BOT_USERNAME;

  useEffect(() => {

    console.log('Bot username:', botUsername); // перевірка
    window.onTelegramAuth = async (userData) => {
      try {
        const res = await fetch('http://127.0.0.1:4000/verify-and-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        const result = await res.json();
        if (result.status === 'known') {
          setUser(result.user);
          setStatus('authorized');
        } else if (result.status === 'unknown') {
          window.location.href = result.startLink;
        }
      } catch (err) {
        console.error('Помилка авторизації:', err);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    document.getElementById('telegram-button').appendChild(script);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Авторизація через Telegram</h1>
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
