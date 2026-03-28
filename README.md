# LogiTrack — Logistics Command Center

A professional-grade, full-stack MERN "Command Center" for real-time logistics and physical asset management. Built for high-density operational environments with a focus on keyboard-first navigation and visual clarity.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-blue?logo=tailwindcss) ![Operational UI](https://img.shields.io/badge/UI-Command--Center-indigo)

## 🧱 The Command Center Architecture

The interface is designed as a **3-Panel Mission Control**:

| Panel | Function | Description |
|-------|----------|-------------|
| **Sidebar** | Navigation | Collapsible operational hub with status-aware routing. |
| **Logic Board** | Operations | Central high-density data grid with Table/Grid view toggles. |
| **Activity Feed** | Intelligence | Real-time stream of warehouse events and system-level logs. |

---

## 🚀 Advanced Features

### ⌨️ Universal Command Palette (Ctrl + K)
Navigate the entire system at the speed of thought. 
- **Global Search**: Instantly locate any product or asset across the distribution network.
- **Quick Commands**: Execute "Add Product", "Go to Dashboard", or "Logout" from any screen.
- **Trigger**: `Ctrl + K` (Windows/Linux) or `Cmd + K` (Mac).

### 🛡️ Secure Entity Management
- **Schema-First Validation**: All data entry is strictly validated via **Zod** and handled by **React Hook Form** for zero-latency feedback.
- **Asset documentation**: Integrated high-speed image uploads with optimized previews and size enforcement.
- **Bulk Orchestration**: Select and de-provision multiple assets simultaneously with safety confirmation.

### 🎨 Operational Aesthetic
- **Glassy Black Infrastructure**: Premium dark-mode interface designed to reduce eye strain in mission-critical environments.
- **Visual Cues**: Success, Warning, and Danger indicators aligned with standard logistics signaling.
- **Micro-Animations**: Purposeful motion powered by `framer-motion` to guide user attention.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (Vite), TailwindCSS v4, **Zustand**, **cmdk**, **Zod**, **React Hook Form**.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB Atlas.
- **Security**: JWT (HttpOnly Cookies), bcrypt password hashing.

---

## 📂 Project Structure

```
Logistics/
├── backend/
│   ├── models/ (User, Product)
│   ├── routes/ (Auth, Product)
│   └── controllers/ (Entity logic)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── DashboardLayout.jsx (3-Panel Core)
    │   │   │   ├── Topbar.jsx (Command Central)
    │   │   │   ├── Sidebar.jsx (Ops Navigation)
    │   │   │   ├── ActivityPanel.jsx (Intel Feed)
    │   │   │   └── CommandPalette.jsx (Universal UI)
    │   │   ├── product/
    │   │   │   ├── ProductCard.jsx (Entity Grid)
    │   │   │   ├── ProductTable.jsx (Dense Logic)
    │   │   │   └── ProductForm.jsx (Zod Validated)
    │   │   └── ui/ (Custom primitive component library)
    │   ├── pages/ (Dashboard, AddEntity, Auth)
    │   └── store/ (Zustand Global State)
```

---

## ⚡ Quick Start

### 1. Requirements
- **Node.js**: v18+ 
- **MongoDB**: Active connection (Local or Atlas)

### 2. Initialization

```bash
# Clone the repository
cd Logistics

# Backend Intel
cd backend
npm install
# Create .env (PORT, MONGODB_URI, JWT_SECRET)
npm run dev

# Frontend Ops
cd ../frontend
npm install
npm run dev
```

### 3. Operational Manual
1. **Access**: Navigate to `http://localhost:5173`.
2. **Onboarding**: Register a new "Operator" account.
3. **Deployment**: Add assets via the **Create Entity** modal or standalone page.
4. **Command**: Use **Ctrl+K** to navigate rapidly between data silos.

---

## 📄 License
MIT Operational License.
