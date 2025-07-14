
// /api/verify-and-check.js
import { AuthDataValidator } from '@telegram-auth/server';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const validator = new AuthDataValidator({
    botToken: process.env.REACT_APP_BOT_TOKEN,
  });

  try {
    const user = await validator.validate(req.body);
    console.log('✅ Telegram авторизовано:', user);

    // можеш зберегти user в БД або Google Sheets
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('❌ Невірна авторизація Telegram:', err);
    return res.status(403).json({ success: false, message: 'Invalid login' });
  }
}