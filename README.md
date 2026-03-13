# PrimeTrade Task Management System

A full-stack, secure, and scalable task management application built as part of the Backend Developer Intern assignment.

## 🚀 Features

### Backend (Primary Focus)
- **Authentication**: Secure registration and login with JWT and password hashing (bcrypt).
- **Role-Based Access Control (RBAC)**: Distinct permissions for `user` and `admin` roles.
- **CRUD APIs**: Full CRUD operations for a "Task" entity.
- **API Versioning**: All routes prefixed with `/api/v1`.
- **Validation & Error Handling**: Robust input validation and centralized error handling middleware.
- **Documentation**: Interactive API documentation powered by Swagger.

### Frontend (Supportive)
- **Modern Stack**: Built with Next.js, React, and TypeScript.
- **Premium UI**: Stunning glassmorphism design with Framer Motion animations.
- **Protected Routes**: Secure dashboard access using Auth Context and JWT.
- **Dashboard**: Interactive task management with real-time feedback.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: Next.js 14, React, Tailwind CSS (Style Tokens), Framer Motion, Lucide Icons
- **Auth**: JSON Web Tokens (JWT), Bcrypt.js
- **Docs**: Swagger UI, Swagger JSDoc

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the provided configuration:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=24h
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 API Documentation

Once the backend is running, you can access the Swagger documentation at:
`http://localhost:5000/api-docs`

---

## 📈 Scalability

For a detailed note on how this system can be scaled for millions of users, please refer to [SCALABILITY.md](./SCALABILITY.md).

---
