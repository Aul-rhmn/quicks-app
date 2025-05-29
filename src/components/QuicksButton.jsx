import React from "react";
import { FiMessageSquare, FiCheckSquare, FiZap } from "react-icons/fi";

const QuicksButton = ({
  onToggleQuicks,
  onOpenTab,
  activeTab,
  isPanelOpen,
}) => {
  const iconSize = 24;

  const baseStyle =
    "p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none";
  const activeStyle = "bg-primary-blue text-white";
  const inactiveStyle =
    "bg-primary-gray-light text-primary-gray-dark hover:bg-primary-gray-medium";

  if (!isPanelOpen) {
    return (
      <div className="fixed bottom-[30px] right-[30px] z-50">
        <button
          onClick={() => onToggleQuicks("main")}
          className={`${baseStyle} bg-primary-blue text-white`}
          aria-label="Open Quicks"
        >
          <FiZap size={iconSize} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-[30px] right-[30px] flex flex-row-reverse items-center gap-3 z-50">
      {activeTab === "inbox" && (
        <button
          onClick={() => onToggleQuicks(null)}
          className={`${baseStyle} ${activeStyle}`}
          aria-label="Close Inbox"
        >
          <FiMessageSquare size={iconSize} />
        </button>
      )}
      {activeTab === "tasks" && (
        <button
          onClick={() => onToggleQuicks(null)}
          className={`${baseStyle} ${activeStyle}`}
          aria-label="Close Tasks"
        >
          <FiCheckSquare size={iconSize} />
        </button>
      )}

      {activeTab !== "tasks" && (
        <button
          onClick={() => onOpenTab("tasks")}
          className={`${baseStyle} ${inactiveStyle}`}
          aria-label="Open Tasks"
        >
          <FiCheckSquare size={iconSize} />
        </button>
      )}

      {activeTab !== "inbox" && (
        <button
          onClick={() => onOpenTab("inbox")}
          className={`${baseStyle} ${inactiveStyle}`}
          aria-label="Open Inbox"
        >
          <FiMessageSquare size={iconSize} />
        </button>
      )}

      {!activeTab && (
        <button
          onClick={() => onToggleQuicks(null)}
          className={`${baseStyle} ${activeStyle}`}
          aria-label="Close Quicks"
        >
          <FiZap size={iconSize} />
        </button>
      )}
    </div>
  );
};

export default QuicksButton;
