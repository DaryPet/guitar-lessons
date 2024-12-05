// chatService.ts
import axios from "axios";
import { CHAT_HISTORY_URL, CHAT_SEND_MESSAGE_URL } from "../config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (
    { userId1, userId2 }: { userId1: number; userId2: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${CHAT_HISTORY_URL}?user1=${userId1}&user2=${userId2}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      return rejectWithValue("Failed to fetch chat history");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    {
      senderId,
      receiverId,
      content,
    }: { senderId: number; receiverId: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(CHAT_SEND_MESSAGE_URL, {
        senderId,
        receiverId,
        content,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to send message:", error);
      return rejectWithValue("Failed to send message");
    }
  }
);
