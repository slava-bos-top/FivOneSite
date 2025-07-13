const crypto = require('crypto');
const fetch = require('node-fetch'); // Якщо локально — npm i node-fetch

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hash, ...rest } = req.body;

  // 🔐 Перевірка хешу Telegram
  const checkString = Object.keys(rest)
    .sort()
    .map(key => `${key}=${rest[key]}`)
    .join('\n');

  const secret = crypto.createHash('sha256').update(process.env.REACT_APP_BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

  if (hmac !== hash) {
    return res.status(403).json({ status: 'invalid', error: 'Bad Telegram hash' });
  }

  const userId = String(rest.id);

  // ✅ Перевірка наявності userId
  if (!userId) {
    console.error('❌ userId відсутній');
    return res.status(400).json({ status: 'error', message: 'userId is missing' });
  }

  try {
    // 🔍 Перевірка в Google Sheets
    const checkRes = await fetch(`${process.env.REACT_APP_GOOGLE_SCRIPT_URL}?id=${userId}`);
    const checkData = await checkRes.json();

    if (checkData.exists === true) {
      return res.json({ status: 'known', user: req.body });
    }

    // 💾 Збереження нового користувача
    const saveRes = await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const saveData = await saveRes.json();

    if (saveData.success === true) {
      // ✉️ Надсилання повідомлення користувачу
      console.log('🧪 Надсилаємо повідомлення користувачу з id:', userId);

      const tgRes = await fetch(`https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: userId,
          text: `👋 Привіт, ${rest.first_name}! Ви успішно авторизувалися на сайті.`,
        }),
      });

      const tgData = await tgRes.json();
      console.log('📩 Відповідь Telegram API:', tgData);

      if (!tgData.ok) {
        if (tgData.error_code === 403) {
          console.error('⚠️ Користувач ще не написав боту. Неможливо надіслати повідомлення.');
        } else {
          console.error('⚠️ Інша помилка надсилання повідомлення:', tgData.description);
        }
      }

      return res.json({
        status: 'saved',
        user: req.body,
        tgData,
        warning: !tgData.ok ? 'sendMessage_failed' : undefined,
      });
    }

    return res.status(500).json({ status: 'error', message: 'Не вдалося зберегти користувача' });

  } catch (err) {
    console.error('❌ Помилка запиту до Google Script або Telegram:', err);
    return res.status(500).json({ status: 'error', message: 'Серверна помилка' });
  }
};