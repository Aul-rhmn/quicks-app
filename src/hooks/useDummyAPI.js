
import { useState, useEffect, useCallback } from 'react';
import { initialChats, initialTasks, currentUser } from '../data/dummyData';

const simulateAPICall = (data, delay = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    simulateAPICall(initialChats)
      .then(data => {
        setChats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load chats:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const addMessageToChat = useCallback(async (chatId, messageText) => {
    const targetChat = chats.find(c => c.id === chatId);
    if (!targetChat) return;

    const newMessage = {
      id: `msg${Date.now()}_${chatId}`,
      senderId: currentUser.id,
      name: currentUser.name,
      text: messageText,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`
    };

    await simulateAPICall(newMessage, 100);

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage.text,
              lastMessageTimestamp: newMessage.timestamp.split(' ').pop(),
              lastMessageSenderName: currentUser.name,
            }
          : chat
      )
    );
    return newMessage;
  }, [chats]);

  const editMessageInChat = useCallback(async (chatId, messageId, newText) => {
    await simulateAPICall({ messageId, newText }, 100);
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = chat.messages.map(msg =>
            msg.id === messageId ? { ...msg, text: newText, edited: true } : msg
          );
          let newLastMessage = chat.lastMessage;
          if (chat.messages[chat.messages.length -1]?.id === messageId) {
            newLastMessage = newText;
          }
          return { ...chat, messages: updatedMessages, lastMessage: newLastMessage };
        }
        return chat;
      })
    );
  }, []);

  const deleteMessageFromChat = useCallback(async (chatId, messageId) => {
    await simulateAPICall({ messageId }, 100);
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = chat.messages.filter(msg => msg.id !== messageId);
          let newLastMessage = chat.lastMessage;
          let newLastMessageTimestamp = chat.lastMessageTimestamp;
          let newLastMessageSenderName = chat.lastMessageSenderName;

          if (chat.messages[chat.messages.length -1]?.id === messageId && updatedMessages.length > 0) {
            const lastMsg = updatedMessages[updatedMessages.length -1];
            newLastMessage = lastMsg.text;
            newLastMessageTimestamp = lastMsg.timestamp.split(' ').pop();
            newLastMessageSenderName = lastMsg.name;
          } else if (updatedMessages.length === 0) {
            newLastMessage = "Chat empty";
            newLastMessageTimestamp = "";
            newLastMessageSenderName = "";
          }
          return { ...chat, messages: updatedMessages, lastMessage: newLastMessage, lastMessageTimestamp: newLastMessageTimestamp, lastMessageSenderName: newLastMessageSenderName };
        }
        return chat;
      })
    );
  }, []);

  return { chats, loading, error, addMessageToChat, editMessageInChat, deleteMessageFromChat, currentUser };
};

const calculateTaskDynamics = (task) => {
  if (!task.completed && task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0,0,0,0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      task.daysLeftText = 'Overdue';
      task.daysLeftColor = 'indicator-red';
    } else if (diffDays === 0) {
      task.daysLeftText = 'Today';
      task.daysLeftColor = 'indicator-orange';
    } else {
      task.daysLeftText = `${diffDays} Day${diffDays !== 1 ? 's' : ''} Left`;
      task.daysLeftColor = diffDays <= 7 ? 'indicator-orange' : 'indicator-yellow';
    }
  } else {
    task.daysLeftText = null;
    task.daysLeftColor = null;
  }
  return task;
};


export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const processedTasks = initialTasks
        .map(task => calculateTaskDynamics({...task}));

    simulateAPICall(processedTasks)
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const addTask = useCallback(async (taskData, listId) => {
    let newTask = {
      id: `task${Date.now()}`,
      ...taskData,
      completed: false,
      category: 'open',
      listId: listId === 'all' ? null : listId,
    };
    newTask = calculateTaskDynamics(newTask);

    await simulateAPICall(newTask, 300);
    setTasks(prevTasks => [newTask, ...prevTasks]);
    return newTask;
  }, []);

  const updateTask = useCallback(async (taskId, updatedData) => {
    let taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    let finalUpdatedData = { ...taskToUpdate, ...updatedData };
    if (updatedData.hasOwnProperty('stickers')) {
        finalUpdatedData.stickers = updatedData.stickers;
    }

    finalUpdatedData = calculateTaskDynamics(finalUpdatedData);

    await simulateAPICall(finalUpdatedData, 300);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? finalUpdatedData : task
      )
    );
  }, [tasks]);

  const toggleTaskComplete = useCallback(async (taskId) => {
    const taskToToggle = tasks.find(t => t.id === taskId);
    if (!taskToToggle) return;

    const newCompletedStatus = !taskToToggle.completed;
    const updatedTaskData = {
      completed: newCompletedStatus,
      category: newCompletedStatus ? 'completed' : 'open',
      completedDate: newCompletedStatus ? new Date().toISOString().split('T')[0] : null,
    };
    await updateTask(taskId, updatedTaskData);
  }, [tasks, updateTask]);

  const deleteTask = useCallback(async (taskId) => {
    await simulateAPICall({ id: taskId }, 300);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  return { tasks, loading, error, addTask, updateTask, toggleTaskComplete, deleteTask };
};