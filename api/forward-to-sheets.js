export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { phone } = req.body;

  try {
    const scriptURL = "https://script.google.com/macros/s/AKfycbzQThwJvJJZuN-rhZ_W1tVyjKFrYdXa7D9IhLii6-BL2dXSGaII4ZoDQ8PhnqrQuYW9/exec";

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({ phone }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}