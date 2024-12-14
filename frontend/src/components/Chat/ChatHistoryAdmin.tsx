import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../config/apiConfig";
import { getAllUsers } from "../../services/authService";
import {
  User,
  Message,
  filterChatMessages,
} from "../../services/filterChatService";
import styles from "./ChatHistoryAdmin.module.css";

const convertLinks = (text: string): React.ReactNode => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const ChatHistoryAdmin: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<ReturnType<
    typeof socketIOClient
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 10;

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      console.error("Authentication token is missing.");
      setError("Authentication token is missing");
      return;
    }

    const newSocket = socketIOClient(BASE_URL, {
      transports: ["websocket"],
      auth: {
        token: storedToken,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", () => {
      // console.log("Disconnected from WebSocket server");
    });

    newSocket.on("newMessage", (message: Message) => {
      if (
        (message.sender.id === user?.id &&
          message.receiver.id === selectedUser?.id) ||
        (message.sender.id === selectedUser?.id &&
          message.receiver.id === user?.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user, selectedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users: User[] = await getAllUsers();
        setUsers(users);
      } catch (error) {
        setError("Error fetching users");
        console.error(error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchChatHistory = async (selectedUser: User) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/chat/history?user1=${selectedUser.id}&user2=${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching chat history: ${response.statusText}`);
      }

      const chatHistory: Message[] = await response.json();
      setMessages(chatHistory);
    } catch (error) {
      setError(`Error fetching chat history: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !selectedUser) {
      setError(
        "Cannot send message. Selected user or message content is missing."
      );
      return;
    }

    socket.emit("sendMessage", {
      senderId: user?.id,
      receiverId: selectedUser.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    fetchChatHistory(user);
    setCurrentPage(1);
  };

  const filteredMessages = filterChatMessages(
    messages,
    user?.id || null,
    selectedUser?.id || null
  );

  const sortedMessages = filteredMessages.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = sortedMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPages = Math.ceil(sortedMessages.length / messagesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userList}>
        <h2>Students</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              className={selectedUser?.id === u.id ? styles.selectedUser : ""}
              onClick={() => selectUser(u)}
            >
              {u.name || u.email}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatInput}>
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
      <div className={styles.chatHistory}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {selectedUser && (
          <>
            <div>
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.chatMessage} ${
                    message.sender.id === user?.id
                      ? styles.myMessage
                      : styles.otherMessage
                  }`}
                >
                  <strong>
                    {message.sender.id === user?.id
                      ? "You"
                      : message.sender.name}
                    :
                  </strong>{" "}
                  {convertLinks(message.message_content)}
                  <span className={styles.timestamp}>
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            {sortedMessages.length > messagesPerPage && (
              <div className={styles.pagination}>
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Older messages
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Newer messages
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryAdmin;
