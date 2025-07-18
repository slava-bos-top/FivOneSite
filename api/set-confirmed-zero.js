export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone is required' });
    }
    console.log(phone)
  
    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbwsVFp2w9V957t3iKE4EsEY6poiBquD2M-Wu712Z-UfKrFBLYp6xD1wrBjufTe_zAwl/exec";
  
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
  
    //   const data = await resGAS.json();
      const text = await resGAS.text();
        console.log("RAW response from GAS:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            return res.status(500).json({ success: false, message: "Failed to parse GAS response" });
        }
    //   console.log(data)
  
      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false, message: "Google Apps Script error" });
      }
    } catch (err) {
      console.error("Server error:", err); 
      return res.status(500).json({ success: false, message: err.message });
    }
  }