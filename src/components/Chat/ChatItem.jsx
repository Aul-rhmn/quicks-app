import React from "react";
import { currentUser } from "../../data/dummyData";

const ChatItem = ({ chat, onSelectChat, isActive }) => {
  const otherParticipant =
    !chat?.groupChat && chat?.participants
      ? chat.participants.find((p) => p.id !== currentUser.id)
      : null;

  const displayTitle = chat?.title || "Unknown Chat";

  const getAvatarDetails = () => {
    if (chat?.id === "chat_fastvisa")
      return {
        color: "bg-indicator-purple",
        textColor: "text-white",
        text: "FV",
      };
    if (chat?.id === "chat2")
      return { color: "bg-primary-blue", textColor: "text-white", text: "CP" };

    let text = "?";
    if (otherParticipant && otherParticipant.name) {
      text = otherParticipant.name.substring(0, 1).toUpperCase();
    } else if (displayTitle) {
      text = displayTitle.substring(0, 1).toUpperCase();
    }

    const groupColor =
      (chat?.participants?.length || 0) > 2 ? "bg-sticker-4" : "bg-sticker-2"; 
    const groupTextColor = "text-primary-gray-dark";

    return { color: groupColor, textColor: groupTextColor, text: text };
  };

  const avatar = getAvatarDetails();

  return (
    <div
      className={`flex items-start px-[22px] py-[14px] cursor-pointer border-b border-quicks-border/50 last:border-b-0 min-h-[76px]
                  ${
                    isActive
                      ? "bg-primary-blue/10"
                      : "hover:bg-primary-gray-light/20"
                  }`}
      onClick={() => chat && onSelectChat(chat.id)}
    >
      <div
        className={`w-[34px] h-[34px] rounded-full ${
          avatar.color
        } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 relative
                      ${
                        isActive
                          ? "ring-2 ring-primary-blue ring-offset-1 ring-offset-primary-blue/10"
                          : ""
                      }`}
      >
        <span className={`text-sm font-bold ${avatar.textColor}`}>
          {avatar.text}
        </span>
      </div>

      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <h3
            className="text-[15px] font-lato-bold text-primary-blue truncate"
            title={displayTitle}
          >
            {displayTitle.length > 25
              ? `${displayTitle.substring(0, 22)}...`
              : displayTitle}
          </h3>
          <span className="text-12px font-lato text-primary-gray-medium flex-shrink-0 ml-2">
            {chat?.lastMessageTimestamp}
          </span>
        </div>

        <div className="flex items-center mt-0.5">
          {chat?.lastMessageSenderName && chat?.lastMessage && (
            <p className="text-14px font-lato text-primary-gray-dark truncate">
              <span className="font-lato-bold">
                {chat.lastMessageSenderName}:
              </span>{" "}
              {chat.lastMessage}
            </p>
          )}
          {!chat?.lastMessageSenderName && chat?.lastMessage && (
            <p className="text-14px font-lato text-primary-gray-dark truncate">
              {chat.lastMessage}
            </p>
          )}
          {chat?.unreadCount > 0 && (
            <div className="w-2 h-2 bg-indicator-red rounded-full ml-auto flex-shrink-0 self-start mt-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
