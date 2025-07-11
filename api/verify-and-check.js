const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hash, ...rest } = req.body;

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

  try {
    const checkRes = await fetch(`${process.env.REACT_APP_GOOGLE_SCRIPT_URL}?id=${userId}`);
    const checkData = await checkRes.json();

    if (checkData.exists === true) {
      return res.json({ status: 'known', user: req.body });
    }

    const saveRes = await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(req.body),
    });
    const saveData = await saveRes.json();

    if (saveData.success === true) {
      return res.json({ status: 'saved', user: req.body });
    }

    return res.status(500).json({ status: 'error', message: 'Не вдалося зберегти' });

  } catch (err) {
    console.error('❌ Помилка запиту до Google Script:', err);
    return res.status(500).json({ status: 'error', message: 'Серверна помилка' });
  }
};