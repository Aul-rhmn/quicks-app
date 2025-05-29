
# Quicks Pop-up Application

This is the frontend implementation of **Quicks**, a pop-up application featuring two alternating tools: **Messaging** and a **To-Do List**. The goal of this project is to deliver a **pixel-perfect, interactive frontend experience** based on a provided Figma design, with backend behavior simulated using dummy data.

**Live Demo**: [https://quicks-app-pi.vercel.app](https://quicks-app-pi.vercel.app)

**Figma Design**: [View Design](https://bit.ly/simpul-front-end-challenge-quicks)

---

##  Features

###  Dual Tools

* Toggle seamlessly between **Messaging** and **To-Do List**.

### Messaging

* View ongoing chat groups.
* Open individual conversations.
* Send, edit, and delete messages.
* Show system messages and date dividers.
* Simulate real-time "like" updates.

### To-Do List

* Add tasks with title, description, due date, and sticker.
* Manage task status: "Open" or "Completed."
* Edit task details.
* Mark tasks complete/incomplete.
* Filter with "My Tasks" dropdown (e.g., Personal Errands, Urgent To-Do).
* Visual "Days Left" indicator.

### Design Precision

* Matches Figma pixel-by-pixel: color, spacing, typography, iconography.

### Simulated Backend

* Local dummy data and fake API calls.
* No server setup required.

---

## Tech Stack

* **React.js** – Functional components & hooks
* **Tailwind CSS** – Utility-first CSS framework
* **React Icons** – Feather icon library
* **JavaScript (ES6+)** – Modern syntax and JSX
* **npm / yarn** – For package management

---

## Prerequisites

Make sure you have:

* [Node.js](https://nodejs.org/) (LTS recommended)
* `npm` (included with Node.js) or `yarn` (optional)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd quicks-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Then open your browser and go to `http://localhost:3000`.
