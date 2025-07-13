
const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { hash, ...user } = req.body;

  const checkString = Object.keys(user)
    .sort()
    .map(key => `${key}=${user[key]}`)
    .join('\n');

  const secret = crypto
    .createHash('sha256')
    .update(process.env.REACT_APP_BOT_TOKEN)
    .digest();

  const hmac = crypto
    .createHmac('sha256', secret)
    .update(checkString)
    .digest('hex');

  if (hmac !== hash) {
    return res.status(403).json({ success: false, message: 'Invalid Telegram hash' });
  }

  // ✅ Валідація пройдена. Можеш зберегти користувача, видати токен тощо.
  console.log('🧾 Telegram user авторизований:', user);

  return res.status(200).json({ success: true, user });
};
