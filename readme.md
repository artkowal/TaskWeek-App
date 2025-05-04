# 🗓️ TaskWeek

[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![dnd-kit](https://img.shields.io/badge/dnd--kit-5C5F62?style=flat-square&logo=dndkit&logoColor=white)](https://github.com/clauderic/dnd-kit)
[![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat-square&logo=lucideicons&logoColor=white)](https://lucide.dev/)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)](https://git-scm.com/)

## 🛠️ Technologies Used

This project is built with a modern JavaScript stack:

**Frontend:**

- React
- JavaScript (ES6+)
- HTML5 & CSS3
- Bootstrap for responsive components
- dnd-kit for drag & drop
- Lucide icons

**Backend:**

- Node.js & Express
- PostgreSQL database
- Environment variable management (.env)

## ✨ Live Demo & Screenshots

| Welcome Screen | Login Screen | Dashboard (Desktop) |
|:--------------:|:------------:|:-------------------:|
| ![TW_WelcomeScreen](https://github.com/user-attachments/assets/453bf297-e72a-4845-9a94-fea696d4ec63) | ![TW_Login](https://github.com/user-attachments/assets/4912af37-c293-4338-945e-26789ffbf496) | ![TW_Dashboard](https://github.com/user-attachments/assets/577dd4b5-5be3-4358-bc0b-e19200cd2445) |

| Dashboard (Mobile) | Small-screen To-Do | Sidebar |
|:-----------------:|:-----------------:|:-------:|
| ![TW_Dashboard_Small](https://github.com/user-attachments/assets/fa67cf33-1aa8-4df5-9cb0-f4215fb2b3cb) | ![TW_Dashboard_Small_TodoList](https://github.com/user-attachments/assets/7fddab62-5090-4f02-be8c-b7b7599a9cdf) | ![TW_Sidebar](https://github.com/user-attachments/assets/fa781ee9-b46d-4f44-a5fb-71652b0cadf9) |


## 🎯 Features

- **User Authentication**
  - Registration & login;
- **Weekly Schedule View**
  - Drag & drop events for easy rescheduling;
- **Event Management**
  - Create, edit, and delete events;
- **Task Management (To‑Do List)**
  - Slide-out panel with tasks;
  - Mark tasks as completed;
  - Add & remove tasks;
- **User Settings**
  - Change password;
  - Automatic weekly data cleanup;
- **Responsive Design**
  - Large screens: schedule view + sidebar tasks panel;
  - Small screens: overlay panel for tasks

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/artkowal/TaskWeek-App.git frontend

cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will run by default at http://localhost:3000.

### Backend Setup

```bash
# Clone the backend repository
git clone https://github.com/Dzejkop02/task-week-back.git

# Install dependencies
npm install

# Create a .env file based on .env.example
# Populate it with your database credentials and other secrets

# Start the server
npm run dev
```

The backend API will listen by default on http://localhost:3001.
