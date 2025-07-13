
// /api/verify-and-login.js
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST allowed' });
  }

  const validator = new AuthDataValidator({
    botToken: process.env.REACT_APP_BOT_TOKEN, // 🔒 Повинен бути точним токеном твого бота
  });

  try {
    const user = await validator.validate(req.body); // validate Telegram login data
    console.log('✅ Перевірено Telegram користувача:', user);

    // 🔹 Тут можна зберегти user в Google Sheets, базі даних або надіслати повідомлення
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('❌ Invalid Telegram login:', error);
    return res.status(403).json({ success: false, message: 'Invalid Telegram login' });
  }
}