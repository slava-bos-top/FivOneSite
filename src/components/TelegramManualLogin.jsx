// TelegramManualLogin.jsx
import React from 'react';

const TelegramManualLogin = () => {
  const handleLogin = () => {
    const botUsername = 'fivone_bot';
    const redirectUrl = `https://oauth.telegram.org/auth?bot_id=7912350149&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=write&lang=uk&return_to=${encodeURIComponent('https://fiv-one-site.vercel.app/telegram-callback')}`;

    window.open(redirectUrl, '_blank', 'width=500,height=500');
  };

  return (
    <button onClick={handleLogin} className="tg-login-button">
      🔐 Увійти через Telegram
    </button>
  );
};

export default TelegramManualLogin;