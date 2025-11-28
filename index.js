import express from "express";
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// --- تنظیمات بات تلگرام ---
const TELEGRAM_TOKEN = "TOKEN_YOU_GOT_FROM_BOTFATHER";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// پیام ورودی از تلگرام
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // ارسال ورودی کاربر به ایجنت
  const agentRes = await fetch("YOUR_AGENT_API_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: text }),
  });

  const data = await agentRes.json();

  // خروجی ایجنت → ارسال به تلگرام
  bot.sendMessage(chatId, data.output_text || "پیامی دریافت نشد!");
});

// برای vercel لازم است:
app.get("/", (req, res) => {
  res.send("Bot is running.");
});

export default app;
