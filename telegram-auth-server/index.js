// server/index.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

// ⚠️ node-fetch — ESM, тому динамічний імпорт:
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 Заповни ці значення!

// -------------------------------------------------------------
// УТИЛІТИ
// -------------------------------------------------------------
/**
 * Перевірка достовірності даних, що прийшли від Telegram Login Widget.
 */
function checkTelegramAuth(data, botToken) {
  const { hash, ...rest } = data;

  const checkString = Object.keys(rest)
    .sort()
    .map(key => `${key}=${rest[key]}`)
    .join('\n');

  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac   = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

  return hmac === hash;
}

/**
 * Чи існує користувач у Google Sheets?
 * Apps Script повинен на GET ?id=XXX повертати { "exists": true | false }.
 */
async function checkIfUserExistsInGoogleSheets(userId) {
  try {
    const res  = await fetch(`${process.env.REACT_APP_GOOGLE_SCRIPT_URL}?id=${userId}`);
    const data = await res.json();
    return data.exists === true;
  } catch (err) {
    console.error('❌ Помилка під час перевірки Google Sheets:', err);
    return false;
  }
}

/**
 * Запис нового користувача у Google Sheets (POST JSON у Apps Script).
 * Apps Script очікує { ...userData } і повертає { "success": true }.
 */
async function saveUserToGoogleSheets(user) {
  try {
    const res  = await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(user),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('❌ Помилка запису у Google Sheets:', err);
    return false;
  }
}

// -------------------------------------------------------------
// МАРШРУТИ
// -------------------------------------------------------------
/**
 * Перевірка авторизації Telegram Web Login + синхронізація з Google Sheets.
 */
app.post('/verify-and-check', async (req, res) => {
  console.log('📥 Запит від Telegram WebApp:', req.body);

  // 1) Перевірка хеша
  if (!checkTelegramAuth(req.body, process.env.REACT_APP_BOT_TOKEN)) {
    return res.status(403).json({ status: 'invalid', error: 'Bad Telegram hash' });
  }

  // 2) Перевірка в Google Sheets
  const userId = String(req.body.id);
  const exists = await checkIfUserExistsInGoogleSheets(userId);

  if (exists) {
    // Уже відомий користувач
    return res.json({ status: 'known', user: req.body });
  }

  // 3) Новий користувач — запис у Sheets
  const saved = await saveUserToGoogleSheets(req.body);
  if (saved) {
    return res.json({ status: 'saved', user: req.body });
  }

  // 4) Якщо не вдалося зберегти
  res.status(500).json({ status: 'error', message: 'Не вдалося зберегти користувача' });
});

/**
 * Примітивний GET / — щоб не ловити 404 у браузері.
 */
app.get('/', (req, res) => {
  res.send('Сервер Telegram‑авторизації працює ✅');
});

// -------------------------------------------------------------
// СТАРТ СЕРВЕРА
// -------------------------------------------------------------
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущено: http://127.0.0.1:${PORT}`);
});