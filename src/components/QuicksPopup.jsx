import React, { useState } from "react";
import ChatList from "./Chat/ChatList";
import ChatView from "./Chat/ChatView";
import TaskList from "./Task/TaskList";
import LoadingSpinner from "./common/LoadingSpinner";
import { useChats } from "../hooks/useDummyAPI";

const QuicksPopup = ({ activeTab, isVisible }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const {
    chats,
    loading: chatsLoading,
    error: chatsError,
    addMessageToChat,
    editMessageInChat,
    deleteMessageFromChat,
    currentUser,
  } = useChats();

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
  };

  if (!isVisible) {
    return null;
  }

  let content;
  if (activeTab === "inbox") {
    if (chatsLoading) {
      content = (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <LoadingSpinner />
          <p className="mt-2 text-primary-gray-medium text-14px">
            Loading Chats ...
          </p>
        </div>
      );
    } else if (chatsError) {
      content = (
        <p className="text-center text-indicator-red p-4">
          Error loading chats.
        </p>
      );
    } else {
      content =
        selectedChatId && selectedChat ? (
          <ChatView
            chat={selectedChat}
            currentUser={currentUser}
            onBack={handleBackToChatList}
            onSendMessage={addMessageToChat}
            onEditMessage={editMessageInChat}
            onDeleteMessage={deleteMessageFromChat}
          />
        ) : (
          <ChatList
            onSelectChat={handleSelectChat}
            activeChatId={selectedChatId}
          />
        );
    }
  } else if (activeTab === "tasks") {
    content = <TaskList />;
  } else {
    content = <div className="p-6 text-primary-gray-dark">Select a tool</div>;
  }

  const popupWidth = "375px";
  const popupHeight = "70vh";

  return (
    <div
      className={`fixed bottom-[90px] right-[30px] bg-quicks-bg shadow-quicks rounded-lg overflow-hidden flex flex-col
                  transition-all duration-300 ease-in-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10 pointer-events-none"
                  }`}
      style={{
        width: popupWidth,
        height: popupHeight,
        maxHeight: "calc(100vh - 120px)",
      }}
    >
      <div className="flex-grow h-full overflow-hidden">{content}</div>
    </div>
  );
};

export default QuicksPopup;
