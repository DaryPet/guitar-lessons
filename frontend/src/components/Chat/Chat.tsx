// components/Chat/Chat.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchChatHistory } from "../../services/chatService"; // Удалили неиспользуемый sendMessage
import { addMessage, resetChatState } from "../../redux/slices/chatSlice";
import socketIOClient from "socket.io-client";

// Используем BASE_URL из вашего API
import { BASE_URL } from "../../config/apiConfig";

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Состояние для нового сообщения
  const [newMessage, setNewMessage] = useState("");

  // Состояние сокета
  const [socket, setSocket] = useState<ReturnType<
    typeof socketIOClient
  > | null>(null);

  useEffect(() => {
    if (user) {
      // Устанавливаем соединение с WebSocket сервером
      const newSocket = socketIOClient(BASE_URL, {
        auth: {
          token: localStorage.getItem("jwtToken"), // Токен, используемый для аутентификации
        },
      });

      // Сохраняем сокет в состоянии
      setSocket(newSocket);

      // Подписываемся на события при подключении к серверу
      newSocket.on("connect", () => {
        console.log("Connected to WebSocket server");

        // Загружаем историю чата между пользователем и администратором при подключении
        dispatch(fetchChatHistory({ userId1: Number(user.id), userId2: 1 }));
        // ID администратора может быть динамическим
      });

      // Получение нового сообщения через WebSocket
      newSocket.on("newMessage", (message: any) => {
        console.log("New message received:", message);
        dispatch(addMessage(message));
      });

      // Обработка отключения
      newSocket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      // Очистка сокета при размонтировании компонента
      return () => {
        newSocket.disconnect();
        setSocket(null);
        dispatch(resetChatState());
      };
    }
  }, [dispatch, user]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      const messageData = {
        receiverId: 1, // Администратор, которому отправляем сообщение. ID администратора может быть динамическим.
        content: newMessage,
      };
      // Отправляем сообщение через сокет
      socket.emit("sendMessage", messageData);
      setNewMessage(""); // Очистка поля ввода после отправки
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {loading && <p>Loading messages...</p>}
        {error && <p>Error: {error}</p>}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.senderId === Number(user?.id)
                ? "my-message"
                : "other-message"
            }`}
          >
            <strong>
              {message.senderId === Number(user?.id) ? "You" : "Admin"}:
            </strong>{" "}
            {message.content}
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
