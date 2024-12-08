import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BASE_URL } from "../../config/apiConfig";
import { getAllUsers } from "../../services/authService";
import {
  filterChatMessages,
  Message,
  User,
} from "../../services/filterChatService";

import styles from "./ChatHistory.module.css";
import Loader from "../Loader/Loader";

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

const ChatHistory: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 10;

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const users: User[] = await getAllUsers();
        const admin = users.find((u) => u.role === "admin");
        if (admin) {
          setAdminId(admin.id);
        } else {
          setError("Admin not found");
        }
      } catch (error) {
        setError("Error while fetching user data");
        console.error("Error while fetching users:", error);
      }
    };

    if (user) {
      fetchAdminId();
    }
  }, [user]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setError("Access token is missing. Please log in.");
        return;
      }

      if (!user || !adminId) {
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/chat/history?user1=${user.id}&user2=${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error while fetching chat history: ${response.statusText}`
          );
        }

        const chatHistory: Message[] = await response.json();
        setMessages(chatHistory);
      } catch (error) {
        setError(`Error while fetching chat history: ${error}`);
        console.error("Error while fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (adminId && user) {
      fetchChatHistory();
    }
  }, [adminId, user]);

  const filteredMessages = filterChatMessages(
    messages,
    user?.id || null,
    adminId
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
      <div className={styles.chatHistory}>
        {loading && <Loader />}
        {error && <p>Error: {error}</p>}
        {currentMessages.length === 0 && !loading && <p>No messages</p>}
        {currentMessages.map((message) => (
          <div
            key={message.id}
            className={`${styles.chatMessage} ${
              message.sender.id === user?.id
                ? styles.myMessage
                : styles.otherMessage
            }`}
          >
            <strong>{message.sender.id === user?.id ? "You" : "Admin"}:</strong>{" "}
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
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Newer messages
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
