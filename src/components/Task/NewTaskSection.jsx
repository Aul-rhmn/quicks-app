import React, { useState } from "react";
import {
  FiCalendar,
  FiAlignLeft,
  FiSquare,
  FiMoreVertical,
  FiPlus,
  FiTag,
  FiX,
  FiPlusCircle,
} from "react-icons/fi";
import { predefinedStickers } from "../../data/dummyData"; // Import predefined stickers

const colorClassMap = {
  "sticker-1": "bg-sticker-1",
  "sticker-2": "bg-sticker-2",
  "sticker-3": "bg-sticker-3",
  "sticker-4": "bg-sticker-4",
  "sticker-5": "bg-sticker-5",
  "sticker-6": "bg-sticker-6",
  "sticker-7": "bg-sticker-7",
  "indicator-red": "bg-indicator-red",
  "indicator-orange": "bg-indicator-orange",
  "indicator-purple": "bg-indicator-purple",
  "primary-blue": "bg-primary-blue",
};

const NewTaskSection = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [newTaskStickers, setNewTaskStickers] = useState([]);
  const [selectedStickerIdForNewTask, setSelectedStickerIdForNewTask] =
    useState("");

  const handleAddTaskInternal = () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }
    onAddTask({
      title: title.trim(),
      dueDate: dueDate || null,
      description: description.trim() || "",
      stickers: newTaskStickers,
    });

    setTitle("");
    setDueDate("");
    setDescription("");
    setIsDescriptionEditing(false);
    setShowMoreMenu(false);
    setNewTaskStickers([]);
    setSelectedStickerIdForNewTask("");
  };

  const handleAddStickerToNewTask = () => {
    if (!selectedStickerIdForNewTask) return;
    const stickerToAdd = predefinedStickers.find(
      (s) => s.id === selectedStickerIdForNewTask
    );
    if (
      stickerToAdd &&
      !newTaskStickers.find((s) => s.id === stickerToAdd.id)
    ) {
      setNewTaskStickers([...newTaskStickers, { ...stickerToAdd }]);
    }
    setSelectedStickerIdForNewTask("");
  };

  const handleRemoveStickerFromNewTask = (stickerIdToRemove) => {
    setNewTaskStickers(
      newTaskStickers.filter((sticker) => sticker.id !== stickerIdToRemove)
    );
  };

  const getStickerDisplayTextColor = (bgColorName) => {
    const darkBgs = [
      "indicator-red",
      "indicator-orange",
      "indicator-purple",
      "primary-blue",
    ];
    if (darkBgs.includes(bgColorName)) {
      return "text-sticker-light-text";
    }
    return "text-sticker-default-text";
  };

  const availableStickersForNewTask = predefinedStickers.filter(
    (ps) => !newTaskStickers.some((nts) => nts.id === ps.id)
  );

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
                  setNewTaskStickers([]);
                  setSelectedStickerIdForNewTask("");
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
            className={`text-14px font-lato hover:text-primary-blue text-left w-full ${
              description
                ? "text-primary-gray-dark"
                : "text-primary-gray-medium italic"
            }`}
          >
            {description
              ? description.length > 40
                ? description.substring(0, 37) + "..."
                : description
              : "No Description"}
          </button>
        )}
      </div>

      <div className="my-3 p-2 border border-dashed border-primary-gray-light rounded pl-[32px]">
        <label className="block text-12px font-lato-bold text-primary-gray-dark mb-1.5 flex items-center">
          <FiTag size={14} className="mr-1.5 text-primary-gray-medium" /> Add
          Stickers
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
          {newTaskStickers.map((sticker) => (
            <span
              key={sticker.id}
              className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-lato font-semibold ${
                colorClassMap[sticker.colorName] || "bg-gray-200"
              } ${getStickerDisplayTextColor(sticker.colorName)}`}
            >
              {sticker.text}
              <button
                onClick={() => handleRemoveStickerFromNewTask(sticker.id)}
                className="ml-1.5 hover:text-indicator-red p-0.5 rounded-full hover:bg-white/30 transition-colors"
              >
                <FiX size={10} />
              </button>
            </span>
          ))}
          {newTaskStickers.length === 0 && (
            <p className="text-10px text-primary-gray-medium italic">
              No stickers added yet.
            </p>
          )}
        </div>
        {availableStickersForNewTask.length > 0 ? (
          <div className="flex items-center gap-2 mt-1">
            <select
              value={selectedStickerIdForNewTask}
              onChange={(e) => setSelectedStickerIdForNewTask(e.target.value)}
              className="flex-grow text-12px p-1.5 border border-primary-gray-light rounded outline-none focus:border-primary-blue bg-white appearance-none"
            >
              <option value="">-- Select sticker --</option>
              {availableStickersForNewTask.map((sticker) => (
                <option key={sticker.id} value={sticker.id}>
                  {sticker.text}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddStickerToNewTask}
              disabled={!selectedStickerIdForNewTask}
              className="p-1 text-primary-blue hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlusCircle size={22} />
            </button>
          </div>
        ) : (
          newTaskStickers.length > 0 && (
            <p className="text-10px text-primary-gray-medium italic mt-1">
              All available sticker types added.
            </p>
          )
        )}
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleAddTaskInternal}
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
