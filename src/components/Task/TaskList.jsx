import React, { useState, useRef, useEffect } from "react";
import TaskItem from "./TaskItem";
import NewTaskSection from "./NewTaskSection";
import TaskLoadingState from "./TaskLoadingState";
import { useTasks } from "../../hooks/useDummyAPI";
import { taskLists } from "../../data/dummyData";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlusSquare,
  FiList,
} from "react-icons/fi";

const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
  } = useTasks();

  const [openAccordionSections, setOpenAccordionSections] = useState({
    open: true,
    completed: true,
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [selectedListId, setSelectedListId] = useState(taskLists[0].id);
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleAccordionSection = (section) => {
    setOpenAccordionSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddNewTask = (taskData) => {
    const currentListForNewTask =
      selectedListId === "all" ? null : selectedListId;
    addTask(taskData, currentListForNewTask);
    setShowNewTaskForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsListDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  if (loading) return <TaskLoadingState />;
  if (error)
    return (
      <p className="text-center text-indicator-red p-4">
        Error: {error.message || "Failed to load tasks."}
      </p>
    );

  const filteredTasks =
    selectedListId === "all"
      ? tasks
      : tasks.filter((task) => task.listId === selectedListId);

  const openTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const selectedListName =
    taskLists.find((list) => list.id === selectedListId)?.name || "Tasks";

  const AccordionSectionHeader = ({ title, count, isOpen, onToggle }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-3 bg-primary-gray-light/10 hover:bg-primary-gray-light/30 border-b border-quicks-border"
    >
      <div className="flex items-center">
        {isOpen ? (
          <FiChevronDown size={18} className="mr-2 text-primary-gray-medium" />
        ) : (
          <FiChevronRight size={18} className="mr-2 text-primary-gray-medium" />
        )}
        <h3 className="text-14px font-lato-bold text-primary-gray-dark">
          {title}
        </h3>
      </div>
      <span className="text-12px text-primary-gray-medium bg-primary-gray-light px-1.5 py-0.5 rounded-full">
        {count}
      </span>
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-quicks-bg text-primary-gray-dark">
      <div className="flex items-center justify-between p-[16px_20px] border-b border-quicks-border bg-white sticky top-0 z-10">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
            className="flex items-center p-1 -ml-1 rounded hover:bg-primary-gray-light/30"
          >
            <FiList size={18} className="mr-2 text-primary-gray-dark" />
            <h2 className="text-16px font-lato-bold text-primary-gray-dark">
              {selectedListName}
            </h2>
            <FiChevronDown
              size={20}
              className={`ml-1.5 text-primary-gray-medium transition-transform duration-200 ${
                isListDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isListDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-quicks-border rounded shadow-lg z-20">
              {taskLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => {
                    setSelectedListId(list.id);
                    setIsListDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-14px hover:bg-primary-gray-light/30 ${
                    selectedListId === list.id
                      ? "bg-primary-blue/10 text-primary-blue font-semibold"
                      : "text-primary-gray-dark"
                  }`}
                >
                  {list.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowNewTaskForm((prev) => !prev)}
          className="bg-primary-blue text-white font-lato text-12px px-3 py-1.5 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FiPlusSquare size={16} className="mr-1.5" /> New Task
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto">
        {showNewTaskForm && <NewTaskSection onAddTask={handleAddNewTask} />}

        <AccordionSectionHeader
          title="Open Tasks"
          count={openTasks.length}
          isOpen={openAccordionSections.open}
          onToggle={() => toggleAccordionSection("open")}
        />
        {openAccordionSections.open && (
          <div className="bg-white min-h-[50px]">
            {openTasks.length > 0 ? (
              openTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <p className="p-4 text-center text-14px text-primary-gray-medium">
                No open tasks in this list.
              </p>
            )}
          </div>
        )}

        <AccordionSectionHeader
          title="Completed Tasks"
          count={completedTasks.length}
          isOpen={openAccordionSections.completed}
          onToggle={() => toggleAccordionSection("completed")}
        />
        {openAccordionSections.completed && (
          <div className="bg-white min-h-[50px]">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <p className="p-4 text-center text-14px text-primary-gray-medium">
                No completed tasks in this list.
              </p>
            )}
          </div>
        )}
        {(!openAccordionSections.open || openTasks.length === 0) &&
          (!openAccordionSections.completed || completedTasks.length === 0) &&
          !showNewTaskForm && (
            <div className="bg-white flex-grow flex items-center justify-center p-10">
              <p className="text-primary-gray-medium">Task list is quiet...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default TaskList;
