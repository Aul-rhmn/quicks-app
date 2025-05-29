/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary
        "primary-blue": "#2F80ED",
        "primary-gray-dark": "#4F4F4F",
        "primary-gray-medium": "#828282",
        "primary-gray-light": "#E0E0E0",

        // Indicator
        "indicator-orange": "#F8B76B",
        "indicator-purple": "#8785FF",
        "indicator-red": "#EB5757",
        "indicator-yellow": "#F2C94C",

        // Chats (message bubbles)
        "chat-bg-user": "#EEDCFF",
        "chat-text-user": "#9B51E0",
        "chat-bg-other": "#FCEED3",
        "chat-text-other": "#E5A443",
        "chat-bg-system": "#F2F2F2",

        // Quicks specific
        "quicks-bg": "#FFFFFF",
        "quicks-header-bg": "#F2F2F2",
        "quicks-icon-active": "#2F80ED",
        "quicks-icon-inactive": "#828282",
        "quicks-panel-bg": "#333333",
        "quicks-text-light": "#FFFFFF",
        "quicks-text-dark": "#4F4F4F",
        "quicks-text-medium": "#828282",
        "quicks-border": "#E0E0E0",

        // Indicator
        "indicator-orange": "#F8B76B",
        "indicator-purple": "#8785FF",
        "indicator-red": "#EB5757",
        "indicator-yellow": "#F2C94C",

        // Stickers
        "sticker-1": "#E9F3FF",
        "sticker-2": "#FDCFA4",
        "sticker-3": "#F9E9C3",
        "sticker-4": "#AFEBDB",
        "sticker-5": "#CBF1C2",
        "sticker-6": "#CFCEF9",
        "sticker-7": "#F9E0FD",
        "sticker-default-text": "#4F4F4F",
        "sticker-light-text": "#FFFFFF",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      fontSize: {
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
      },
      spacing: {
        "22px": "22px",
        "24px": "24px",
        "32px": "32px",
      },
      boxShadow: {
        quicks: "0px 0px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
