export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { chat_id, text } = req.body;

  if (!chat_id) {
    return res.status(400).json({ success: false, message: 'chat_id is required' });
  }

  const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN; // ✅ ВАЖЛИВО: правильна змінна без REACT_APP

  const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text }),
    });

    const result = await response.json();

    if (result.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: result.description });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}