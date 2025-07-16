export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  
    const { phone } = req.body;
  
    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbx6QMMLKcY8YfzUARUjSHTMfrm6JCoUhLbpWkey2k6tj8AV7NAi9DrtA1BybDIFJNA8/exec";
  
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ phone }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  