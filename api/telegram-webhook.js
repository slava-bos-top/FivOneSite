export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const update = req.body;
  
    // 🟡 Обробка повідомлення /start
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const username = update.message.from.username;
  
      console.log("🔥 Chat ID:", chatId);
      console.log("🔤 Text:", text);
  
      // Наприклад, обробка /start=...
      if (text.startsWith("/start")) {
        const param = text.split(" ")[1]; // /start 380501234567
        const phone = param || "не передано";
  
        // Зберігаєш у базу/Google Sheets
        // await saveUser({ chatId, phone });
  
        await sendTelegramMessage(chatId, `Ваш номер підтверджено: ${phone}`);
      }
    }
  
    // 🟡 Обробка натиснутої inline кнопки
    if (update.callback_query) {
      const chatId = update.callback_query.from.id;
      const data = update.callback_query.data;
  
      console.log("⚙️ Callback:", data);
  
      await sendTelegramMessage(chatId, `Ви натиснули: ${data}`);
    }
  
    res.status(200).end();
  }
  
  // Допоміжна функція
  async function sendTelegramMessage(chatId, text) {
    const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
  
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });
  }