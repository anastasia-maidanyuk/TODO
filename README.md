# 📝 TaskMaster


**TaskMaster** is a robust, full-stack task management application designed to help users organize their daily activities efficiently. It features a modern, responsive interface, real-time data updates, and bilingual support (English/Ukrainian).

Built as a technical assignment to demonstrate proficiency in **Modern React (Next.js)**, **Node.js**, and **Database Management**.

---

## 🚀 Demo

[DEMO] - 

---

## ✨ Key Features

- **CRUD Operations:** Create, Read, Update (Toggle status), and Delete tasks.
- **Advanced Filtering & Sorting:**
  - Search tasks by title.
  - Filter by status (All / Active / Completed).
  - Sort by priority (Ascending / Descending).
- **Internationalization (i18n):** Full support for **English** and **Ukrainian** languages (implemented via React Context).
- **Optimistic UI:** Instant interface updates using **SWR** for a smooth user experience.
- **Priority System:** Assign priority levels (1-10) with visual indicators.
- **Accessibility:** Fully accessible UI with ARIA labels and keyboard navigation support.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14](App Router)
- **Language:** TypeScript
- **UI Library:** [Chakra UI]
- **State Management:** React Context (for i18n), SWR (for server state)
- **Icons:** Lucide React, Chakra Icons

### Backend
- **Runtime:** [Node.js]
- **Framework:** [Express.js]
- **ORM:** [Prisma]
- **Database:** PostgreSQL

---

## 📂 Project Structure

The project follows a clean architecture with a clear separation of concerns:

```bash
root/
├── frontend/             
│   ├── app/             
│   ├── api/             
│   ├── components/       
│   ├── context/          
│   ├── hooks/            
│   ├── types/                     
│   └── utils/        
│
└── backend/            
    ├── prisma/        
    └── index.ts       