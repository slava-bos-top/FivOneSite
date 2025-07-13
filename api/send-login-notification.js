const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { user } = req.body;

  const message = `${user.first_name}, ми одержали запит на авторизацію на core.telegram.org за допомогою вашого Telegram-акаунта.

Щоб підтвердити вхід, натисніть кнопку «Підтвердити» нижче.

Браузер: Chrome 138 on Windows
IP-адреса: 85.114.198.218 (Kyiv, Ukraine)

Якщо ви не робили цього запиту, натисніть кнопку «Відхилити» або проігноруйте це повідомлення.`;

  const result = await fetch(`https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: user.id,
      text: message,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Підтвердити', callback_data: 'confirm_login' },
            { text: '❌ Відхилити', callback_data: 'deny_login' }
          ]
        ]
      }
    })
  });

  const data = await result.json();

  if (!data.ok) {
    return res.status(500).json({ success: false, message: 'Помилка при надсиланні повідомлення', error: data });
  }

  return res.status(200).json({ success: true });
};