import React from 'react';
import TelegramManualLogin from '../TelegramManualLogin';
import './AboutUs.css';

import { LoginButton } from '@telegram-auth/react';
import TelegramLoginButton from "telegram-login-button";

import { v4 as uuidv4 } from 'uuid';

const token = uuidv4(); // напр. 'abc123-456-def'

export default function AboutUs() {

  // Зберігаємо токен у localStorage або state
  localStorage.setItem('tg_login_token', token);

  const telegramBotLink = `https://t.me/YOUR_BOT_USERNAME?start=token_${token}`;

  const handleAuth = async (data) => {
    console.log("🌐 Telegram data:", data);
  
    try {
      const res = await fetch('/api/verify-and-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if (result.success) {
        console.log('✅ Успішна авторизація:', result.user);
        localStorage.setItem('user', JSON.stringify(result.user)); // або в контекст
      } else {
        console.error('❌ Помилка авторизації:', result.message);
      }
    } catch (e) {
      console.error('❌ Server error:', e);
    }
  };

  return (
    <section className="about-us" id="aboutUs">
      <div className="about-us__container">
        <h2 className="about-us__title">Про нас</h2>
        <div>
          <h2>Авторизація через Telegram</h2>
          <TelegramLoginButton
            botName="ggggggggggbhhgt_bot"
            dataOnauth={handleAuth}
            buttonSize="large"
            requestAccess="write"
            lang="uk"
          />
        </div>
        <TelegramManualLogin />
        <a href={telegramBotLink} target="_blank" rel="noopener noreferrer">
          Увійти через Telegram
        </a>

        <div className="about-us__content">
          <div className="about-us__left">
            <div className="about-us__item">
              <p className='about-us__item_text'><strong>5 в 1</strong><br /> Створюємо дистанційні курси за 5 напрямками: наука, технології, мистецтво, комунікації, підприємництво</p>
              <div
                className="about-us__icon"
                style={{ backgroundImage: "url(https://static.tildacdn.one/lib/linea/28f862b7-5d1e-390e-d7ca-d85f0a733d4a/basic_world.svg)" }}
              ></div>
            </div>
            <div className="about-us__item">
              <p className='about-us__item_text'><strong>Інтерактивне навчання</strong><br /> Кожне заняття наповнене практикою, гейміфікацією та командною роботою</p>
              <div className="about-us__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/lib/linea/4aeea8a4-1013-bfc8-ffc9-170e8a9f2d4b/weather_last_quarter.svg)" }}></div>
            </div>
            <div className="about-us__item">
              <p className='about-us__item_text'><strong>Доступність</strong><br /> Курси проходять дистанційно у будь-який час</p>
              <div className="about-us__icon" style={{ backgroundImage: "url(https://static.tildacdn.one/lib/linea/416f1db8-1835-5a77-c9ed-df0c6db3f091/music_record.svg)" }}></div>
            </div>
          </div>

          <div className="about-us__image">
            <img src="https://optim.tildacdn.one/tild6161-3463-4230-b633-653130623138/-/format/webp/public23-1.png.webp" alt="Про нас" />
          </div>

          <div className="about-us__right">
            <div className="about-us__item">
              <div className="about-us__icon" style={{ backgroundImage: "url(https://optim.tildacdn.one/tild3033-6638-4961-a638-633330643663/-/cover/100x100/center/center/-/format/webp/noroot.png.webp)" }}></div>
              <p><strong>Унікальність</strong><br /> Наші програми унікальні, ви не знайдете їх у будь-якому іншому закладі</p>
            </div>
            <div className="about-us__item">
              <div className="about-us__icon" style={{ backgroundImage: "url(https://optim.tildacdn.one/tild6335-3034-4130-b833-653336343164/-/cover/100x100/center/center/-/format/webp/f6cf863599591e03c4e6.png.webp)" }}></div>
              <p><strong>Для підлітків і батьків</strong><br /> Наші курси цікаві не лише підліткам, а і їхнім батькам</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}