// TelegramLogin.jsx
import { LoginButton } from '@telegram-auth/react';

function TelegramLogin() {

//   const handleAuth = async (data) => {
//     console.log("🌐 Telegram data:", data);

//     try {
//       const res = await fetch('/api/verify-and-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();
//       if (result.success) {
//         console.log('✅ Успішна авторизація:', result.user);
//         // Збережи користувача в контексті або localStorage тут
//       } else {
//         console.error('❌ Помилка авторизації:', result.message);
//       }
//     } catch (e) {
//       console.error('❌ Server error:', e);
//     }
//   };

  const handleAuth = async (data) => {
    console.log("🌐 Telegram data:", data);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Авторизація через Telegram</h2>
      <LoginButton
        botUsername="fivone_bot"
        onAuthCallback={handleAuth}
        buttonSize="large"
        cornerRadius={8}
        showAvatar={true}
        lang="uk"
      />
    </div>
  );
}

export default TelegramLogin;