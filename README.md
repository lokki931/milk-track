# 🐄 Milk Production Tracker

This is a web application that allows farmers to track daily milk production, fat percentage, and calculate the estimated income based on fat-adjusted milk prices. Built with **Next.js App Router**, **React**, **Tailwind CSS**, **Prisma**, **SQLite**, and **Context API**.

---

## ✨ Features

- 🗓 Add, edit, and delete daily milk records
- 🧮 Calculate total liters, average fat %, and income
- 📅 Filter by month and year
- 📊 Get summary for:
  - First half of the month
  - Second half of the month
  - Full month
- 🔐 Authentication with **NextAuth**
- 💾 Data stored using **Prisma ORM** and **SQLite**
- 🌐 Fully responsive design

---

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Database**: SQLite
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Validation**: Zod + React Hook Form

---

## 🚀 Getting Started

### 1. Clone the repository

`````bash
git clone https://github.com/lokki931/milk-tracker.git
cd milk-tracker
````

2. Install dependencies

````bash
npm install
````

3. Set up environment variables

Create a .env file based on .env.example and configure:

DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

4. Run Prisma migrations

````bash
npx prisma migrate dev
````

5. Start the development server

````bash
npm run dev


`````
