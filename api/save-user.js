export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { telegramId, action } = req.body;
  
    console.log("📦 Отримано:", { telegramId, action });
  
    // Тут можна зберегти в БД, надіслати ще одне повідомлення тощо
  
    return res.status(200).json({ success: true });
  }