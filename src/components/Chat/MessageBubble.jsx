import React, { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal, FiEdit2, FiTrash } from "react-icons/fi";

const MessageBubble = ({
  message,
  isCurrentUser,
  chatType,
  onEdit,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
  const optionsRef = useRef(null);

  useEffect(() => {
    setEditedText(message.text);
  }, [message.text]);

  const bgColor = isCurrentUser
    ? "bg-chat-bg-user"
    : message.type === "system"
    ? "bg-primary-gray-light/40"
    : "bg-chat-bg-other";
  const textColor = isCurrentUser
    ? "text-chat-text-user"
    : message.type === "system"
    ? "text-primary-gray-medium"
    : "text-chat-text-other";
  const alignment = isCurrentUser ? "self-end" : "self-start";
  const bubbleRadius = isCurrentUser
    ? "rounded-l-lg rounded-br-lg"
    : "rounded-r-lg rounded-bl-lg";

  const time = message.timestamp ? message.timestamp.split(" ").pop() : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !(
          event.target.closest &&
          event.target.closest(".message-options-button")
        )
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  const handleEditSubmit = (e) => {
    if (e) e.preventDefault();
    if (editedText.trim() !== message.text && editedText.trim() !== "") {
      onEdit(message.id, editedText.trim());
    }
    setIsEditing(false);
    setShowOptions(false);
  };

  const handleCancelEdit = () => {
    setEditedText(message.text);
    setIsEditing(false);
    setShowOptions(false);
  };

  if (message.type === "system") {
    return (
      <div
        className={`my-2 py-1.5 px-4 text-center text-12px rounded-full self-center max-w-xs mx-auto ${bgColor} ${textColor}`}
      >
        {message.text}
      </div>
    );
  }

  if (message.type === "date_divider") {
    return (
      <div className="my-3 text-center text-12px font-lato-bold text-primary-gray-medium">
        {message.text}
      </div>
    );
  }

  return (
    <div
      className={`group flex mb-1 max-w-[75%] md:max-w-[65%] ${alignment} ${
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`py-2 px-3 ${bgColor} ${bubbleRadius} shadow-sm relative`}
      >
        {chatType === "group" && !isCurrentUser && message.name && (
          <p
            className={`text-12px font-lato-bold mb-0.5 ${
              isCurrentUser
                ? "text-chat-text-user/80"
                : "text-chat-text-other/80"
            }`}
          >
            {message.name}
          </p>
        )}

        {isEditing ? (
          <div className="w-full min-w-[150px]">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleEditSubmit();
                }
              }}
              className={`w-full p-1 text-14px font-lato leading-snug resize-none bg-transparent border rounded border-primary-blue/50 outline-none ${textColor}`}
              rows={Math.max(1, Math.min(5, editedText.split("\n").length + 1))}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-1.5">
              <button
                onClick={handleCancelEdit}
                className="text-10px text-primary-gray-medium hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="text-10px text-primary-blue hover:underline"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p
            className={`text-14px font-lato leading-snug whitespace-pre-wrap break-words ${textColor}`}
          >
            {message.text}
            {message.edited && (
              <span className="text-10px text-primary-gray-medium/70 ml-1">
                (edited)
              </span>
            )}
          </p>
        )}

        {!isEditing && (
          <span
            className={`text-[10px] mt-1 float-right clear-both ${
              isCurrentUser
                ? "text-chat-text-user/70"
                : "text-chat-text-other/70"
            }`}
          >
            {time}
          </span>
        )}
      </div>

      {isCurrentUser && !isEditing && (
        <div
          ref={optionsRef}
          className={`relative self-center transition-opacity duration-150 opacity-0 group-hover:opacity-100 focus-within:opacity-100 ${
            isCurrentUser ? "mr-1.5" : "ml-1.5"
          }`}
        >
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="message-options-button p-1 text-primary-gray-medium hover:text-primary-gray-dark rounded-full"
          >
            <FiMoreHorizontal size={16} />
          </button>
          {showOptions && (
            <div
              className={`absolute bottom-0 mb-7 w-28 bg-white border border-quicks-border rounded shadow-lg z-20 ${
                isCurrentUser ? "right-0" : "left-0"
              }`}
            >
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
                className="w-full text-left px-3 py-1.5 text-12px text-primary-gray-dark hover:bg-primary-gray-light/30 flex items-center"
              >
                <FiEdit2 size={12} className="mr-1.5" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(message.id);
                  setShowOptions(false);
                }}
                className="w-full text-left px-3 py-1.5 text-12px text-indicator-red hover:bg-primary-gray-light/30 flex items-center"
              >
                <FiTrash size={12} className="mr-1.5" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
