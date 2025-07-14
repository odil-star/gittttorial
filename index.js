const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Твой токен и chat_id
const token = '7608117471:AAFW5ppBmrBWFmSsC_QFK2SYdcR7fdBd3U8';
const chatId = '1061094391';

const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());
app.use(express.static('public'));

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

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
