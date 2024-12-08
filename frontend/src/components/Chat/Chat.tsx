// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import socketIOClient from "socket.io-client";
// import { BASE_URL } from "../../config/apiConfig";
// import { getAllUsers } from "../../services/authService";
// import styles from "./Chat.module.css";

// export interface User {
//   id: string;
//   name: string;
//   username: string;
//   email: string;
//   phone?: string;
//   role: "user" | "admin";
// }
// interface Message {
//   id: number;
//   sender: string;
//   content: string;
//   timestamp: Date;
// }

// const Chat: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [socket, setSocket] = useState<ReturnType<
//     typeof socketIOClient
//   > | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [adminId, setAdminId] = useState<number | null>(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("access_token");

//     if (!storedToken) {
//       console.error("Токен отсутствует в localStorage");
//       setError("Authentication token is missing");
//       return;
//     }

//     const newSocket = socketIOClient(BASE_URL, {
//       auth: {
//         token: storedToken,
//       },
//     });

//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected to WebSocket server");
//       setLoading(false);
//     });

//     newSocket.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//     });

//     newSocket.on("newMessage", (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       newSocket.disconnect();
//       setSocket(null);
//     };
//   }, [user]);

//   useEffect(() => {
//     const fetchAdminId = async () => {
//       try {
//         const users: User[] = await getAllUsers();
//         const admin = users.find((u: User) => u.role === "admin");
//         if (admin) {
//           setAdminId(Number(admin.id));
//         } else {
//           setError("Администратор не найден");
//         }
//       } catch (error) {
//         setError("Ошибка при загрузке данных пользователей");
//       }
//     };

//     if (user) {
//       fetchAdminId();
//     }
//   }, [user]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       if (socket && adminId !== null) {
//         socket.emit("sendMessage", {
//           content: newMessage,
//           senderId: user?.id,
//           receiverId: adminId,
//         });

//         setMessages([
//           ...messages,
//           {
//             id: messages.length + 1,
//             sender: "You",
//             content: newMessage,
//             timestamp: new Date(),
//           },
//         ]);
//         setNewMessage("");
//       } else {
//         console.error(
//           "WebSocket connection is not established or admin not found"
//         );
//         setError("Ошибка отправки сообщения. Не найден администратор.");
//       }
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.chatHistory}>
//         {messages.map((message: Message) => (
//           <div
//             key={message.id}
//             className={`${styles.chatMessage} ${
//               message.sender === "You" ? styles.myMessage : styles.otherMessage
//             }`}
//           >
//             <strong>{message.sender === "You" ? "You" : "Admin"}:</strong>{" "}
//             {message.content}
//             <span className={styles.timestamp}>
//               {new Date(message.timestamp).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className={styles.chatInput}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={!newMessage.trim() || adminId === null}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

//
//
//

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../config/apiConfig";
import { getAllUsers } from "../../services/authService";
import styles from "./Chat.module.css";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

const Chat: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<ReturnType<
    typeof socketIOClient
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      console.error("Authentication token is missing");
      setError("Authentication token is missing");
      return;
    }

    const newSocket = socketIOClient(BASE_URL, {
      auth: {
        token: storedToken,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user]);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const users: User[] = await getAllUsers();
        const admin = users.find((u: User) => u.role === "admin");
        if (admin) {
          setAdminId(Number(admin.id));
        } else {
          setError("Admin not found");
        }
      } catch (error) {
        setError("Error fetching admin ID");
      }
    };

    if (user) {
      fetchAdminId();
    }
  }, [user]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      if (socket && adminId !== null) {
        socket.emit("sendMessage", {
          content: newMessage,
          senderId: user?.id,
          receiverId: adminId,
        });

        setNewMessage("");
      } else {
        console.error(
          "WebSocket connection is not established or admin not found"
        );
        setError("Failed to send message. Admin not found.");
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || adminId === null}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
