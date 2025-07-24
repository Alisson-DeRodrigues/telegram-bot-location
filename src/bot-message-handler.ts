import TelegramBot, { Message } from "node-telegram-bot-api";
import enqueue from "./utils/chat-message-queue";
import {
  getChatState,
  updateChatState,
  resetChatState,
} from "./utils/chat-state";
import * as telegramController from "./controllers/telegram-controller";

const messageHandler = async (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg: Message) => {
    enqueue(msg.chat.id, (done) => {
      updateChatState(msg.chat.id, { step: "started", dados: [] });
      bot.sendMessage(
        msg.chat.id,
        `🗺️ Olá, ${msg.from?.first_name || "usuário"}! Deseja atualizar seu endereço? Responda com "sim" ou "não".`,
      );
      done();
    });
  });

  bot.onText(/sim/i, (msg: Message) => {
    enqueue(msg.chat.id, async (done) => {
      const state = getChatState(msg.chat.id);
      if (state.step === "started") {
        updateChatState(msg.chat.id, { step: "location" });
        bot.sendMessage(
          msg.chat.id,
          `📍Compartilhe sua localização atual clicando em 🧷 e depois localização.`,
        );
      } else if (state.step === "confirmation") {
        const address = state.dados;
        await telegramController.newAddress(address);
        bot.sendMessage(msg.chat.id, `✅ Endereço atualizado com sucesso!`);
        resetChatState(msg.chat.id);
      }
      done();
    });
  });

  bot.onText(/não/i, (msg: Message) => {
    enqueue(msg.chat.id, (done) => {
      const state = getChatState(msg.chat.id);
      if (state.step === "started" || state.step === "confirmation") {
        resetChatState(msg.chat.id);
        bot.sendMessage(msg.chat.id, `❌ Atualização cancelada.`);
      }
      done();
    });
  });

  bot.on("message", (msg: Message) => {
    enqueue(msg.chat.id, (done) => {
      const state = getChatState(msg.chat.id);

      if (state.step === "location" && msg.location) {
        updateChatState(msg.chat.id, {
          step: "neighborhood",
          dados: [...state.dados, { type: "location", data: msg.location }],
        });
        bot.sendMessage(msg.chat.id, `🏘️ Qual o nome do seu bairro?`);
      } else if (state.step === "neighborhood" && msg.text) {
        updateChatState(msg.chat.id, {
          step: "street",
          dados: [...state.dados, { type: "neighborhood", data: msg.text }],
        });
        bot.sendMessage(msg.chat.id, `🛣️ Qual o nome da sua rua?`);
      } else if (state.step === "street" && msg.text) {
        updateChatState(msg.chat.id, {
          step: "number",
          dados: [...state.dados, { type: "street", data: msg.text }],
        });
        bot.sendMessage(msg.chat.id, `🏠 Qual o número da sua residência?`);
      } else if (state.step === "number" && msg.text) {
        updateChatState(msg.chat.id, {
          step: "cep",
          dados: [...state.dados, { type: "number", data: msg.text }],
        });
        bot.sendMessage(msg.chat.id, `📨 Qual o seu CEP?`);
      } else if (state.step === "cep" && msg.text) {
        const finalData = [...state.dados, { type: "cep", data: msg.text }];
        updateChatState(msg.chat.id, {
          step: "confirmation",
          dados: finalData,
        });

        const msgFinal = `
Confira os dados:
📍 Localização: ${JSON.stringify(finalData[0].data)}
🏘️ Bairro: ${finalData[1].data}
🛣️ Rua: ${finalData[2].data}
🏠 Número: ${finalData[3].data}
📨 CEP: ${finalData[4].data}
        
Digite "sim" para confirmar ou "não" para cancelar.
        `;
        bot.sendMessage(msg.chat.id, msgFinal);
      }

      done();
    });
  });
};

export default messageHandler;
