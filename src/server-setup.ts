import express, { Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";
import cors from "cors";
import path from "path";
import router from "./routes";
import messageHandler from "./bot-message-handler";
import bodyParser from "body-parser";
import menu from "./utils/bot-commands-menu";

const createApp = () => {
    const token = process.env.BOT_TOKEN!;
    const url = process.env.URL!;
    const webhookPath = `bot${token}`;

    const app = express();
    app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));

    app.use(webhookPath, bodyParser.raw({ type: "*/*" }));

    app.use(express.json());

    const bot = new TelegramBot(token, { webHook: true });

    bot.setMyCommands(menu);

    bot.setWebHook(`${url}${webhookPath}`)
        .then(() => console.log(`✅ Webhook configurado: ${url}${webhookPath}`))
        .catch((err) => console.error("❌ Erro ao configurar webhook:", err));

    // Endpoint para receber updates do Telegram
    app.post(webhookPath, (req: Request, res: Response) => {
        try {
            bot.processUpdate(JSON.parse(req.body.toString()));
        } catch (err) {
            console.error("Erro ao processar update:", err);
        }
        res.sendStatus(200);
    });

    messageHandler(bot);

    app.use("/", router);
    app.use("/", express.static(path.join(__dirname, "panel")));

    return app;
};

export default createApp;
