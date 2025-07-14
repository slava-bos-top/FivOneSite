import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TelegramCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(searchParams.entries());

    if (data.hash) {
      fetch('/api/verify-and-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('✅ Telegram авторизація:', result);
          navigate('/');
        });
    }
  }, [navigate]);

  return <div>Авторизуємо вас через Telegram...</div>;
};

export default TelegramCallback;