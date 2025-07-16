export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { phone } = req.body;

  try {
    const scriptURL = "https://script.google.com/macros/s/AKfycbw8jtBVaLNpgo7Z2oKc3Oub5GF3DDyUJj3QqP744mdKO0qBZt9i1w8suiVMn2zLwplJ/exec";

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