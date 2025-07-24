import { ChatState } from "../models/chat-state-model";

const chatStates = new Map<number, ChatState>();

export const getChatState = (chatId: number): ChatState => {
  if (!chatStates.has(chatId)) {
    chatStates.set(chatId, { step: 'idle', dados: [] });
  }
  return chatStates.get(chatId)!;
};

export const updateChatState = (chatId: number, newState: Partial<ChatState>) => {
  const current = getChatState(chatId);
  chatStates.set(chatId, { ...current, ...newState });
};

export const resetChatState = (chatId: number) => {
  chatStates.set(chatId, { step: 'idle', dados: [] });
};
