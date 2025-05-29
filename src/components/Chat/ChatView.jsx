import React, { useEffect, useRef, useMemo } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { FiArrowLeft, FiMoreVertical, FiMessageSquare } from "react-icons/fi";

const ChatView = ({
  chat,
  currentUser,
  onBack,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("auto");
  }, [chat?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages?.length]);

  const processedMessages = useMemo(() => {
    if (!chat?.messages || chat.messages.length === 0) return [];

    const messagesWithDividers = [];
    let lastDate = null;

    chat.messages.forEach((msg) => {
      let messageDateStr;
      const parts = msg.timestamp.split(" ");
      if (parts[0].toLowerCase() === "today,") {
        messageDateStr = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else if (parts[0].includes("/")) {
        const dateParts = parts[0].split("/");
        if (dateParts.length === 3) {
          const d = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
          messageDateStr = d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } else {
          messageDateStr = "Unknown Date";
        }
      } else {
      
        messageDateStr = parts.slice(0, -1).join(" ");
      }

      if (messageDateStr && messageDateStr !== lastDate) {
        messagesWithDividers.push({
          id: `divider_${messageDateStr}`,
          type: "date_divider",
          text: messageDateStr.startsWith("Today")
            ? messageDateStr
            : messageDateStr.replace(/, \d{4}$/, ""),
        });
        lastDate = messageDateStr;
      }
      messagesWithDividers.push(msg);
    });
    return messagesWithDividers;
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-primary-gray-medium p-6 bg-white">
        <FiMessageSquare size={48} className="mb-4 opacity-50" />
        <p className="text-16px">Select a chat to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-quicks-border bg-quicks-header-bg">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-primary-gray-dark hover:text-primary-blue"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2
              className="font-lato-bold text-16px text-primary-blue truncate max-w-[200px] sm:max-w-[250px]"
              title={chat.title}
            >
              {chat.title}
            </h2>
            <p className="font-lato text-12px text-primary-gray-medium">
              {chat.participants.length} Participants
            </p>
          </div>
        </div>
        <button className="text-primary-gray-dark hover:text-primary-blue p-1">
          <FiMoreVertical size={20} />
        </button>
      </div>

      <div className="flex-grow px-6 pt-5 pb-3 overflow-y-auto flex flex-col space-y-1 bg-white">
        {processedMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isCurrentUser={msg.senderId === currentUser.id}
            chatType={chat.groupChat ? "group" : "direct"}
            onEdit={(messageId, newText) =>
              onEditMessage(chat.id, messageId, newText)
            }
            onDelete={(messageId) => onDeleteMessage(chat.id, messageId)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={(text) => onSendMessage(chat.id, text)} />
    </div>
  );
};

export default ChatView;
