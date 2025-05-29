import React, { useState, useEffect } from "react";
import {
  FiCheckSquare,
  FiSquare,
  FiCalendar,
  FiEdit3,
  FiTrash2,
  FiMoreVertical,
  FiX,
  FiPlusCircle,
  FiTag,
} from "react-icons/fi";
import { predefinedStickers } from "../../data/dummyData";

const TaskItem = ({ task, onToggleComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editStickers, setEditStickers] = useState([]);
  const [selectedStickerIdToAdd, setSelectedStickerIdToAdd] = useState("");

  useEffect(() => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditDueDate(task.dueDate || "");
    setEditStickers(task.stickers ? task.stickers.map((s) => ({ ...s })) : []);
    setSelectedStickerIdToAdd("");
  }, [task, isEditing]);

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle.trim() || task.title,
      description: editDescription.trim(),
      dueDate: editDueDate || null,
      stickers: editStickers,
    });
    setIsEditing(false);
  };

  const handleAddSticker = () => {
    if (!selectedStickerIdToAdd) return;
    const stickerToAdd = predefinedStickers.find(
      (s) => s.id === selectedStickerIdToAdd
    );
    if (stickerToAdd && !editStickers.find((s) => s.id === stickerToAdd.id)) {
      setEditStickers([...editStickers, { ...stickerToAdd }]);
    }
    setSelectedStickerIdToAdd("");
  };

  const handleRemoveSticker = (stickerIdToRemove) => {
    setEditStickers(
      editStickers.filter((sticker) => sticker.id !== stickerIdToRemove)
    );
  };

  const CheckboxIcon = task.completed ? FiCheckSquare : FiSquare;
  const checkboxColor = task.completed
    ? "text-primary-blue"
    : "text-primary-gray-medium";
  const todayDate = new Date().toISOString().split("T")[0];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day || year.length !== 4) return dateString;
    return `${day}/${month}/${year}`;
  };

  const getStickerDisplayTextColor = (bgColorName) => {
    const darkBgs = ["indicator-red", "indicator-purple", "primary-blue"];
    if (darkBgs.includes(bgColorName)) {
      return "text-sticker-light-text";
    }
    return "text-sticker-default-text";
  };

  const availableStickersToAdd = predefinedStickers.filter(
    (ps) => !editStickers.some((es) => es.id === ps.id)
  );

  return (
    <div
      className={`p-3 border-b border-quicks-border last:border-b-0 bg-white ${
        isEditing ? "shadow-lg ring-1 ring-primary-blue rounded-md my-1" : ""
      }`}
    >
      <div className="flex items-start">
        <button
          onClick={() => !isEditing && onToggleComplete(task.id)}
          className={`mr-3 mt-1 ${checkboxColor} hover:text-primary-blue ${
            isEditing ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isEditing}
        >
          <CheckboxIcon size={20} />
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-14px font-lato-bold text-primary-gray-dark w-full border-b-2 border-primary-blue outline-none pb-1 mb-2"
              placeholder="Task Title"
            />
          ) : (
            <h3
              className={`text-14px font-lato-bold ${
                task.completed
                  ? "line-through text-primary-gray-medium"
                  : "text-primary-gray-dark"
              } mb-0.5`}
            >
              {task.title}
            </h3>
          )}

          {!task.completed &&
            (isEditing ? (
              <div className="flex items-center text-12px my-2">
                <FiCalendar className="mr-2 text-primary-gray-medium" />
                <input
                  type="date"
                  value={editDueDate}
                  min={todayDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="text-primary-gray-dark p-1 border border-primary-gray-light rounded outline-none focus:border-primary-blue"
                />
              </div>
            ) : (
              task.dueDate && (
                <div className="flex items-center text-12px mt-0.5 mb-1">
                  {task.daysLeftText && (
                    <span
                      className={`mr-2 px-1.5 py-0.5 rounded-sm text-white text-[10px] font-bold bg-${task.daysLeftColor}`}
                    >
                      {task.daysLeftText}
                    </span>
                  )}
                  <FiCalendar className="mr-1 text-primary-gray-medium" />
                  <span className="text-primary-gray-medium">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )
            ))}
          {task.completed && task.completedDate && !isEditing && (
            <div className="flex items-center text-12px text-primary-gray-medium mt-0.5 mb-1">
              <FiCalendar className="mr-1" />
              <span>Completed: {formatDate(task.completedDate)}</span>
            </div>
          )}

          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="text-12px text-primary-gray-dark w-full my-2 border border-primary-gray-light rounded p-2 h-20 outline-none focus:border-primary-blue resize-none"
              placeholder="Description..."
            />
          ) : (
            <p
              className={`text-12px my-1 ${
                task.description
                  ? "text-primary-gray-dark"
                  : "text-primary-gray-medium italic"
              }`}
            >
              {task.description || "No Description"}
            </p>
          )}
          {!task.completed &&
            task.description &&
            task.description !== "No Description" &&
            !isEditing && (
              <hr className="border-t-2 border-green-500 mt-1 mb-2 w-1/4" />
            )}

          {isEditing ? (
            <div className="my-3 p-2 border border-dashed border-primary-gray-light rounded">
              <label className="block text-12px font-lato-bold text-primary-gray-dark mb-1.5 flex items-center">
                <FiTag size={14} className="mr-1.5 text-primary-gray-medium" />{" "}
                Stickers
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
                {editStickers.map((sticker) => (
                  <span
                    key={sticker.id}
                    className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-lato font-semibold bg-${
                      sticker.colorName
                    } ${getStickerDisplayTextColor(sticker.colorName)}`}
                  >
                    {sticker.text}
                    <button
                      onClick={() => handleRemoveSticker(sticker.id)}
                      className="ml-1.5 hover:text-indicator-red p-0.5 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <FiX size={10} />
                    </button>
                  </span>
                ))}
                {editStickers.length === 0 && (
                  <p className="text-10px text-primary-gray-medium italic">
                    No stickers assigned.
                  </p>
                )}
              </div>
              {availableStickersToAdd.length > 0 ? (
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={selectedStickerIdToAdd}
                    onChange={(e) => setSelectedStickerIdToAdd(e.target.value)}
                    className="flex-grow text-12px p-1.5 border border-primary-gray-light rounded outline-none focus:border-primary-blue bg-white appearance-none"
                  >
                    <option value="">-- Select sticker to add --</option>
                    {availableStickersToAdd.map((sticker) => (
                      <option key={sticker.id} value={sticker.id}>
                        {sticker.text}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddSticker}
                    disabled={!selectedStickerIdToAdd}
                    className="p-1 text-primary-blue hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlusCircle size={22} />
                  </button>
                </div>
              ) : (
                <p className="text-10px text-primary-gray-medium italic mt-1">
                  All available stickers have been added.
                </p>
              )}
            </div>
          ) : (
            task.stickers &&
            task.stickers.length > 0 && (
              <div className="mt-1.5 mb-1 flex flex-wrap gap-1.5">
                {task.stickers.map((sticker) => (
                  <span
                    key={sticker.id}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-lato font-semibold bg-${
                      sticker.colorName
                    } ${getStickerDisplayTextColor(sticker.colorName)}`}
                  >
                    {sticker.text}
                  </span>
                ))}
              </div>
            )
          )}

          {isEditing && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSave}
                className="text-xs bg-primary-blue text-white px-3 py-1.5 rounded hover:bg-blue-700 font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                }}
                className="text-xs bg-primary-gray-medium text-white px-3 py-1.5 rounded hover:bg-primary-gray-dark font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex-shrink-0 ml-2 relative group">
            <button className="text-primary-gray-medium hover:text-primary-blue p-1">
              <FiMoreVertical size={18} />
            </button>
            <div className="absolute right-0 mt-1 w-32 bg-white border border-quicks-border rounded shadow-lg z-10 hidden group-focus-within:block group-hover:block">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full text-left px-3 py-1.5 text-12px text-primary-gray-dark hover:bg-primary-gray-light/30 flex items-center"
              >
                <FiEdit3 size={14} className="mr-2" /> Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="w-full text-left px-3 py-1.5 text-12px text-indicator-red hover:bg-primary-gray-light/30 flex items-center"
              >
                <FiTrash2 size={14} className="mr-2" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
