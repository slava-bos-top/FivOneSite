// TelegramLogin.jsx
import { useState } from 'react';
import { LoginButton } from '@telegram-auth/react';
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

function TelegramLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleAuth = async (data) => {
    console.log("📦 Отримано Telegram дані:", data);

    try {
      const validator = new AuthDataValidator({
        botToken: process.env.REACT_APP_BOT_TOKEN, // НЕ ВИКЛАДАЙ В ПРОДАКШН 🔥
      });

      // Telegram повертає `data` як об'єкт (а не URL), тому просто валідуємо напряму:
      const userData = await validator.validate(data);
      console.log("✅ Користувач перевірений:", userData);
      setUser(userData);
    } catch (err) {
      console.error("❌ Помилка перевірки Telegram логіну:", err);
      setError('Telegram login validation failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Авторизація через Telegram</h2>

      {user ? (
        <div>
          <p>Вітаємо, {user.first_name}!</p>
          <img src={user.photo_url} alt="avatar" width="100" style={{ borderRadius: '50%' }} />
        </div>
      ) : (
        <LoginButton
          botUsername={process.env.REACT_APP_BOT_USERNAME}
          onAuthCallback={handleAuth}
          buttonSize="large"
          cornerRadius={10}
          showAvatar={true}
          lang="uk"
        />
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default TelegramLogin;