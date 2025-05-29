import React, { useState } from "react";
import ChatItem from "./ChatItem";
import SearchBar from "../common/SearchBar";
import LoadingSpinner from "../common/LoadingSpinner";
import { useChats } from "../../hooks/useDummyAPI";

const ChatList = ({ onSelectChat, activeChatId }) => {
  const { chats, loading, error } = useChats();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading)
    return (
      <div className="p-4">
        <LoadingSpinner />
        <p className="text-center text-primary-gray-medium mt-2">
          Loading Chats ...
        </p>
      </div>
    );
  if (error)
    return (
      <p className="text-center text-indicator-red p-4">Error loading chats.</p>
    );

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chat.participants &&
        chat.participants.some((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
      (chat.lastMessage &&
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col bg-quicks-bg">
      <div className="p-[24px_24px_0_24px]">
        <SearchBar placeholder="Search Chats" onSearch={setSearchTerm} />
      </div>
      <div className="flex-grow overflow-y-auto mt-[22px]">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onSelectChat={onSelectChat}
              isActive={chat.id === activeChatId}
            />
          ))
        ) : (
          <p className="text-center text-primary-gray-medium p-4">
            No chats found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
