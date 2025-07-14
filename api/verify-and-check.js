
// /api/verify-and-check.js
import { AuthDataValidator } from '@telegram-auth/server';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // або: 'https://fiv-one-site.vercel.app'
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST allowed' });
  }

  const validator = new AuthDataValidator({
    botToken: process.env.REACT_APP_BOT_TOKEN,
  });

  try {
    const user = await validator.validate(req.body);
    console.log('✅ Перевірено Telegram користувача:', user);

    // Тут можеш надіслати повідомлення через бота або зберегти в Google Sheets
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('❌ Invalid Telegram login:', error);
    return res.status(403).json({ success: false, message: 'Invalid Telegram login' });
  }
}