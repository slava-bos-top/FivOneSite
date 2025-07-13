import { useEffect } from 'react';
// 🔹 ОГОЛОШЕННЯ window.onTelegramAuthwindow.onTelegramAuth — ОБОВ'ЯЗКОВО до useEffect
if (typeof window !== 'undefined') {
    window.onTelegramAuth = async function (user) {
      console.log('✅ Telegram user:', user);
  
      try {
        const response = await fetch('/api/verify-and-chek', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log('🔐 Авторизація підтверджена:', data.user);
  
          // 🔹 Надсилаємо користувачу повідомлення в Telegram
          await fetch('/api/send-login-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: data.user }),
          });
        } else {
          console.error('⛔ Помилка авторизації:', data.message);
        }
      } catch (error) {
        console.error('❌ Помилка під час авторизації Telegram:', error);
      }
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