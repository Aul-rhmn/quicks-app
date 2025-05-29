import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-6 py-4 border-t border-quicks-border bg-white"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a new message"
        className="flex-grow p-[9px_12px] h-[38px] border border-primary-gray-light rounded-md 
                   focus:ring-1 focus:ring-primary-blue focus:border-primary-blue 
                   outline-none font-lato text-14px text-primary-gray-dark placeholder-primary-gray-medium"
      />
      <button
        type="submit"
        className="bg-primary-blue text-white w-[38px] h-[38px] rounded-md 
                   hover:bg-blue-700 transition-colors flex items-center justify-center flex-shrink-0
                   disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Send message"
        disabled={!text.trim()}
      >
        <FiSend size={18} />
      </button>
    </form>
  );
};

export default MessageInput;
