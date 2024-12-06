// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchChatHistory, sendMessage } from "../../services/chatService";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    resetChatState: (state) => {
      state.messages = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      }),
});

export const { addMessage, resetChatState } = chatSlice.actions;
export const selectChatMessages = (state: RootState) => state.chat.messages;
export default chatSlice.reducer;
