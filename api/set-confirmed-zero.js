export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone is required' });
    }
  
    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbz5Q7sPscrmBnvUM60qM3135hWZyOMMfNJUrNHu_qQ8qQzY8oeVKfYX_ST8rqbUT0Y/exec";
  
      const resGAS = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          action: "resetConfirmed", // дія для Apps Script
        }),
      });
  
      const data = await resGAS.json();
  
      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false, message: "Google Apps Script error" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }