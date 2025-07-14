const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 👉 Укажи свои данные
const token = '7003579025:AAHnn0jRDiCIXbsIZeGtMbje7E-E7IYzfhQ'; // токен бота от @BotFather
const chatId = '1061094391'; // свой Telegram ID (можно получить у @userinfobot)

const bot = new TelegramBot(token, { polling: true });
bot.setWebHook(null); // ✅ отключаем webhook, чтобы избежать ошибки 409

// Разрешаем принимать JSON из формы
app.use(bodyParser.json());
// Подключаем папку с HTML-файлами
app.use(express.static('public'));

// Обработка формы заказа
app.post('/order', (req, res) => {
  const { product, name, phone, address } = req.body;

  const message = `
🛒 *Новый заказ!*
📦 Товар: ${product}
👤 Имя: ${name}
📞 Телефон: ${phone}
📍 Адрес: ${address}
`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  res.sendStatus(200);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});

