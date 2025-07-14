// TelegramManualLogin.jsx
// TelegramLogin.jsx
import React from 'react';

const TelegramLogin = () => {
  const handleLogin = () => {
    const botId = '7912350149'; // або через env
    const origin = window.location.origin;
    const callbackUrl = `${origin}/telegram-callback`;

    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(origin)}&embed=1&request_access=write&lang=uk&return_to=${encodeURIComponent(callbackUrl)}`;

    window.open(url, '_blank', 'width=500,height=500');
  };

  return (
    <button onClick={handleLogin} className="tg-login-button">
      🔐 Увійти через Telegram
    </button>
  );
};

export default TelegramLogin;