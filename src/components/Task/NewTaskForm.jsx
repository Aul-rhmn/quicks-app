import React, { useState } from "react";
import {
  FiCalendar,
  FiAlignLeft,
  FiSquare,
  FiMoreVertical,
  FiPlus,
} from "react-icons/fi";

const NewTaskSection = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }
    onAddTask({
      title: title.trim(),
      dueDate: dueDate || null,
      description: description.trim() || "No Description",
    });

    setTitle("");
    setDueDate("");
    setDescription("");
    setIsDescriptionEditing(false);
    setShowMoreMenu(false);
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="p-[16px_20px_20px_20px] bg-white border-b border-quicks-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center flex-grow mr-2">
          <FiSquare
            size={20}
            className="text-primary-gray-light mr-3 flex-shrink-0"
          />
          <input
            type="text"
            placeholder="Type Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow p-1 border-b-0 focus:border-b-2 focus:border-primary-blue outline-none text-14px font-lato text-primary-gray-dark placeholder-primary-gray-medium"
          />
        </div>
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="text-primary-gray-medium hover:text-primary-blue p-1"
          >
            <FiMoreVertical size={18} />
          </button>
          {showMoreMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-quicks-border rounded shadow-lg z-20">
              <button
                onClick={() => {
                  setTitle("");
                  setDueDate("");
                  setDescription("");
                  setIsDescriptionEditing(false);
                  setShowMoreMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-12px text-primary-gray-dark hover:bg-primary-gray-light/30"
              >
                Clear Fields
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mb-2 pl-[32px]">
        <FiSquare
          size={20}
          className="text-primary-gray-light mr-3 invisible"
        />
        <FiCalendar
          size={18}
          className="text-primary-gray-medium mr-2 flex-shrink-0"
        />
        <div className="text-14px font-lato text-primary-gray-medium">
          <span className="mr-1">Set Date:</span>
          <input
            type="date"
            value={dueDate}
            min={todayDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`p-0.5 border rounded outline-none focus:border-primary-blue ${
              dueDate ? "text-primary-gray-dark" : "text-primary-gray-medium"
            }`}
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
              appearance: "none",
              background: "transparent",
            }}
          />
        </div>
      </div>

      <div className="flex items-start mb-3 pl-[32px]">
        <FiSquare
          size={20}
          className="text-primary-gray-light mr-3 invisible"
        />
        <FiAlignLeft
          size={18}
          className={`mr-2 mt-0.5 flex-shrink-0 ${
            isDescriptionEditing || description
              ? "text-primary-blue"
              : "text-primary-gray-medium"
          }`}
        />
        {isDescriptionEditing ? (
          <textarea
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => {
              if (!description.trim()) setIsDescriptionEditing(false);
            }}
            className="flex-grow p-1 border border-primary-gray-light rounded outline-none focus:border-primary-blue text-12px font-lato text-primary-gray-dark h-16 resize-none"
            rows="2"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsDescriptionEditing(true)}
            className={`text-14px font-lato hover:text-primary-blue ${
              description && description !== "No Description"
                ? "text-primary-gray-dark"
                : "text-primary-gray-medium italic"
            }`}
          >
            {description && description !== "No Description"
              ? description.length > 30
                ? description.substring(0, 27) + "..."
                : description
              : "No Description"}
          </button>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={handleAddTask}
          disabled={!title.trim()}
          className="bg-primary-blue text-white font-lato-bold text-14px px-5 py-2 rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus size={16} className="mr-1.5" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewTaskSection;
