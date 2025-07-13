import { useEffect } from 'react';
// 🔹 ОГОЛОШЕННЯ window.onTelegramAuthwindow.onTelegramAuth — ОБОВ'ЯЗКОВО до useEffect
if (typeof window !== 'undefined') {
    window.onTelegramAuth = function (user) {
      console.log('✅ Telegram user:', user);
    };
  }
  
  function TelegramLogin() {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'fivone_bot'); // ім’я твого бота
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'onTelegramAuth'); // <- саме як назва на window
      script.async = true;
  
      const container = document.getElementById('telegram-login-button');
      if (container) {
        container.innerHTML = '';
        container.appendChild(script);
      }
    }, []);
  
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Авторизація через Telegram</h2>
        <div id="telegram-login-button" />
      </div>
    );
  }
  
  export default TelegramLogin;