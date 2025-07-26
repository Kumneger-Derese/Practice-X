# Practice X - Skill Mastery & Progress Tracking App

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

**Practice X** is a full-stack MERN application designed to help users **practice, track, and master skills** effectively. With robust CRUD functionalities, real-time progress tracking, and a rich text editor for crafting custom tasks and notes, Practice X aims to deliver a seamless learning experience.

---

## 🚀 Features

### 📝 Rich Text Editor

- Fully-featured WYSIWYG editor for tasks, notes, and skill descriptions.
- Supports headings, lists, code blocks, images, and custom formatting.

### 📈 Skill Progress Tracking

- Real-time tracking of user progress for each skill.
- Visual completion percentages based on task completion.
- Dynamic skill completion badges/levels.

### 👥 User Management (CRUD)

- Admin interface for creating, reading, updating, and deleting users.
- User roles & permissions system (admin/user).
- Secure authentication system with JWT.

### 📋 Skill and Task Management (CRUD)

- Create, read, update, delete skill and tasks assigned to users.
- Tasks can include rich text content.
- Task status tracking (To-Do, In Progress, Done).

### 🔄 Realtime UI Updates

- State management with **React Query** for seamless server state synchronization.
- Optimistic UI updates for task completion and progress bars.

### 📸 Video upload

- Upload Task video to cloudinary

### 🔐 Authentication & Authorization

- JWT-based secure login/register.
- Protected routes and access control.
- Token storage using **localStorage (for web)**.

### 📊 Dashboard Overview

- User-friendly dashboard summarizing:
  - Skills in progress
  - Tasks completed
  - Skill mastery percentage
  - Recent activity log

### 🖥️ Fully Responsive Design

- Optimized for both web and mobile devices.
- Built with **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Frontend      | Backend            | State Management         | Others                    |
| ------------- | ------------------ | ------------------------ | ------------------------- |
| React (Vite)  | Node.js + Express  | React Query              | Cloudinary (Media)        |
| Tailwind CSS  | MongoDB + Mongoose | Zustand (Local State)    | JWT (Auth)                |
| Framer Motion | Joi (Validation)   | Redux Toolkit (optional) | SecureStore (Expo Mobile) |

---

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/practice-x.git
cd practice-x
```

### 2. Install Dependencies

For Backend:

```bash
cd server
npm install
```

### For Frontend:

```bash
cd ../client
npm install
```

4. Run the App
   Backend:

````bash
cd server
npm run dev

Frontend:

```bash
cd ../client
npm run dev

````
