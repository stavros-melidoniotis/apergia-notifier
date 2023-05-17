import * as dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

export const sendMessage = async (message) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "User-Agent":
        "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: false,
      disable_notification: false,
      reply_to_message_id: null,
      chat_id: CHANNEL_ID,
    }),
  };

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      options
    );

    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};
