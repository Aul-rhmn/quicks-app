export const currentUser = {
  id: "currentUser",
  name: "You",
  avatar: "https://via.placeholder.com/40/2F80ED/FFFFFF?text=U",
};

export const initialChats = [
  {
    id: "chat1",
    title: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
    participants: [
      {
        id: "user1",
        name: "Mary Hilda",
        avatar: "https://via.placeholder.com/40/FCEED3/E5A443?text=MH",
      },
      {
        id: "user2",
        name: "Obaidullah Amarkhil",
        avatar: "https://via.placeholder.com/40/828282/FFFFFF?text=OA",
      },
      currentUser,
    ],
    messages: [
      {
        id: "msg1_chat1",
        senderId: "user1",
        name: "Mary Hilda",
        text: "Hello Obaidullah, I will be your case advisor for case #29290. I have assigned some homework for you to fill. Please bring us with the due dates. Should you have any questions, you can message me anytime. Thanks.",
        timestamp: "Today, June 09, 2021 19:32",
      },
      {
        id: "msg2_chat1",
        senderId: "currentUser",
        name: "You",
        text: "No worries. It will be completed ASAP. I’ve asked him yesterday.",
        timestamp: "Today, June 09, 2021 19:32",
      },
      {
        id: "msg3_chat1",
        senderId: "currentUser",
        name: "You",
        text: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary",
        timestamp: "Today, June 09, 2021 19:32",
      },
      {
        id: "msg4_chat1",
        senderId: "user1",
        name: "Mary Hilda",
        text: "Sure thing, Claren",
        timestamp: "Today, June 09, 2021 19:32",
      },
      {
        id: "msg5_chat1",
        senderId: "user2",
        name: "Obaidullah Amarkhil",
        text: "Morning. I’ll try to do them. Thanks",
        timestamp: "Today, June 09, 2021 19:32",
      },
    ],
    lastMessage: "Morning. I’ll try to do them. Thanks",
    lastMessageTimestamp: "19:32",
    lastMessageSenderName: "Obaidullah Amarkhil",
    unreadCount: 0,
    groupChat: true,
  },
  {
    id: "chat2",
    title: "109220-Naturalization",
    participants: [
      {
        id: "user3",
        name: "Cameron Phillips",
        avatar: "https://via.placeholder.com/40/AFEBDB/000000?text=CP",
      },
      currentUser,
    ],
    messages: [
      {
        id: "msg1_chat2",
        senderId: "user3",
        name: "Cameron Phillips",
        text: "Please check this out!",
        timestamp: "01/01/2021 19:10",
      },
    ],
    lastMessage: "Please check this out!",
    lastMessageTimestamp: "19:10",
    lastMessageSenderName: "Cameron Phillips",
    unreadCount: 1,
    groupChat: false,
  },
  {
    id: "chat_fastvisa",
    title: "FastVisa Support",
    participants: [
      {
        id: "support_user",
        name: "FastVisa Support",
        avatar: "https://via.placeholder.com/40/8785FF/FFFFFF?text=FV",
      },
      currentUser,
    ],
    messages: [
      {
        id: "msg1_fv",
        senderId: "support_user",
        name: "FastVisa Support",
        text: "Hey there! Welcome to your inbox! Contact us for more information and help about anything. We’ll send you a response as soon as possible.",
        timestamp: "01/06/2021 12:19",
      },
      {
        id: "msg2_fv",
        senderId: "currentUser",
        name: "You",
        text: "Hi, I need help with something can you help me?",
        timestamp: "01/06/2021 12:19",
      },
      {
        id: "msg3_fv_system",
        type: "system",
        text: "Please wait while we connect you with one of our team members...",
        timestamp: "01/06/2021 12:20",
      },
    ],
    lastMessage: "Hi, I need help with something can you help me?",
    lastMessageTimestamp: "12:19",
    lastMessageSenderName: "You",
    unreadCount: 0,
    groupChat: false,
  },
];

export const taskLists = [
  { id: "all", name: "All Tasks" },
  { id: "personal", name: "Personal Errands" },
  { id: "urgent", name: "Urgent To-Do" },
  { id: "work", name: "Work Projects" },
];

export const predefinedStickers = [
  {
    id: "s_important_asap",
    text: "Important ASAP",
    colorName: "indicator-red",
  },
  {
    id: "s_offline_meeting",
    text: "Offline Meeting",
    colorName: "indicator-orange",
  },
  { id: "s_client_related", text: "Client Related", colorName: "sticker-6" },
  { id: "s_self_task", text: "Self Task", colorName: "sticker-1" },
  { id: "s_review_docs", text: "Review Docs", colorName: "sticker-3" },
  { id: "s_follow_up_call", text: "Follow Up Call", colorName: "sticker-4" },
  { id: "s_research", text: "Research", colorName: "sticker-5" },
  { id: "s_planning", text: "Planning", colorName: "sticker-7" },
  { id: "s_bug_fix", text: "Bug Fix", colorName: "indicator-purple" },
];

export const initialTasks = [
  {
    id: "task1",
    title: "Set up appointment with Dr Blake",
    description: "No Description",
    dueDate: "2024-07-20",
    completed: false,
    category: "open",
    listId: "urgent",
    stickers: [
      predefinedStickers.find((s) => s.id === "s_important_asap"),
      predefinedStickers.find((s) => s.id === "s_offline_meeting"),
    ].filter(Boolean),
  },
  {
    id: "task2",
    title: "Set up documentation report for several Cases",
    description:
      "All Cases must include all payment transactions, all documents and forms filed.",
    dueDate: "2024-08-15",
    completed: false,
    category: "open",
    listId: "work",
    stickers: [
      predefinedStickers.find((s) => s.id === "s_client_related"),
      predefinedStickers.find((s) => s.id === "s_review_docs"),
    ].filter(Boolean),
  },
  {
    id: "task5",
    title: "Cross-reference with Jeanne for Case #192813",
    description: "Client requires quick turnaround.",
    dueDate: "2024-07-25",
    completed: false,
    category: "open",
    listId: "work",
    stickers: [
      predefinedStickers.find((s) => s.id === "s_follow_up_call"),
    ].filter(Boolean),
  },
  {
    id: "task3",
    title: "Check and Revise Homework from Andre Goncales",
    description:
      "Homeworks needed to be checked: Client Profile, Passport Requirements, Personal Documents.",
    dueDate: "2024-06-11",
    completed: true,
    category: "completed",
    completedDate: "2024-06-11",
    listId: "personal",
    stickers: [predefinedStickers.find((s) => s.id === "s_review_docs")].filter(
      Boolean
    ),
  },
  {
    id: "task4",
    title: "Follow up with client HJKL",
    description: "Sent email, awaiting response.",
    dueDate: "2024-05-01",
    completed: true,
    category: "completed",
    completedDate: "2024-05-03",
    listId: "personal",
    stickers: [],
  },
];
