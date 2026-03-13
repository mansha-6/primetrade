# 🛡️ PrimeTrade: Advanced Operations Terminal

A high-performance, secure, and visually stunning Task Management System engineered for the **PrimeTrade Backend Developer Intern** assignment. This project demonstrates enterprise-level backend architecture integrated with a state-of-the-art management frontend.

---

## 🚀 Key Features

### 🔧 Robust Backend (Primary Focus)
- **Advanced Auth**: Secure user lifecycle (Register/Login) with **JWT** and **Bcrypt** password hashing.
- **RBAC (Role-Based Access Control)**: Tiered access for `User` and `Admin` classifications. 
  - *Admins*: Global visibility and management across all operational units.
  - *Users*: Isolated operational environment for personal tasks.
- **Entity Management**: Comprehensive CRUD lifecycle for "Task" intelligence.
- **Enterprise Standards**: 
  - **API Versioning**: Scalable `/api/v1` architecture.
  - **Global Error Handling**: Standardized JSON error response middleware.
  - **Security Suite**: `Helmet` for HTTP header security, `CORS` for cross-origin management.
- **Interactive Documentation**: Full **Swagger/OpenAPI 3.0** terminal for real-time API testing.

### 💎 Premium Frontend (Supportive)
- **Next.js 14 Architecture**: Utilizing the latest App Router and Server/Client component paradigms.
- **Hyper-Modern UI**: Custom **Glassmorphism Design System** built with Vanilla CSS (No generic frameworks).
- **Dynamic UX**: Powered by `Framer Motion` for fluid structural transitions and micro-animations.
- **Operational Dashboard**:
  - **Live Intel Search**: Precision filtering of tasks by keywords.
  - **Phase Filtering**: Instant status-based task categorization (Pending, In-Progress, Completed).
  - **Identity Terminal**: Dedicated user profile management for credential updates.
- **Real-time Feedback**: Integrated `react-hot-toast` for synchronization status alerts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Logic** | Node.js, Express.js |
| **Identity** | JSON Web Tokens, Bcrypt.js |
| **Memory** | MongoDB Atlas, Mongoose ODM |
| **Interface** | Next.js 14, React, TypeScript |
| **Aesthetics** | Vanilla CSS (Nexus Design System), Framer Motion |
| **Documentation** | Swagger UI, OpenAPI 3.0 |

---

## 🚦 Deployment & Initialization

### Prerequisites
- Node.js (v18.x+)
- MongoDB Atlas Account

### Quick Start (Local Environment)

#### 1. Backend Synchronization
```bash
cd backend
npm install
# Configure .env:
# PORT=5000 | MONGODB_URI=your_atlas_uri | JWT_SECRET=your_secret | JWT_EXPIRE=24h
npm run dev
```

#### 2. Frontend Launch
```bash
cd frontend
npm install
npm run dev
```

### 🌍 Production Deployment
- **Backend**: Optimized for deployment on **Render** (Root: `/backend`).
- **Frontend**: Optimized for **Vercel** (Root: `/frontend`).
- **Critical Config**: Ensure `NEXT_PUBLIC_API_URL` is set in Vercel settings to point to your live Render API.

---

## 📖 Intelligence & Documentation

Access the interactive API command center at:
`http://localhost:5000/api-docs` (Development)

---

## 📈 Enterprise Scaling

For a strategic roadmap on scaling this system to support millions of concurrent operatives, review the **[SCALABILITY.md](./SCALABILITY.md)** document.

---

**Developed for PrimeTrade Recruitment Assessment.** 
*Confidentiality Level: Internal*
