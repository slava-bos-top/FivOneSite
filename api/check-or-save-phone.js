export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  
    const { phone } = req.body;
  
    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbwpAYzKmXm4qVsY9ph1XCfuZPd7tN3xD-lFhRwm_MdYJdENNBjRlzD1LooMaKLMIsrx/exec";
  
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
  