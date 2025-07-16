export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  
    const { phone } = req.body;
  
    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbx029c5s60pg3C02J3dan7ogFn-IF208xogD1PKvwzYT_ylQ0Tb5KQA-VtmZ0WW65kh/exec";
  
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
  