export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

export interface Message {
  id: number;
  sender: User;
  receiver: User;
  message_content: string;
  timestamp: string;
}

export const filterChatMessages = (
  messages: Message[],
  userId: string | null,
  adminId: string | null
): Message[] => {
  if (!userId || !adminId) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        (message.sender.id === userId && message.receiver.id === adminId) ||
        (message.sender.id === adminId && message.receiver.id === userId)
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};
