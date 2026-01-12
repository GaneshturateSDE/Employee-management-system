# 🏢 Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** built using  
**React.js, Node.js, Express.js, MySQL**, and **JWT authentication** with **role-based access control**.

---

## 🚀 Features

### 🔐 Authentication
- Login using **username & password**
- JWT-based authentication
- Role-based access (**HR / EMPLOYEE**)

### 👤 Employee Module (HR Only)
- View employee list
- Manage employees

### 📝 Leave Management
- **Employee**
  - Apply for leave
  - View own leave requests
- **HR**
  - View all leave requests
  - Approve / Reject leave

### 🕒 Attendance Management
- **Employee**
  - View own attendance (read-only)
- **HR**
  - View all employees
  - Mark attendance **date-wise (Present / Absent)**

### 🎭 Role-Based UI
- Employees see only their own data
- HR sees full management controls

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----|-----------|
Frontend | React.js, Tailwind CSS |
Backend | Node.js, Express.js |
Database | MySQL |
Authentication | JWT |
API Calls | Axios |

---

## 📁 Project Structure

ems/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Leave.jsx
│   │   │   └── Attendance.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── employeeService.js
│   │   │   ├── leaveService.js
│   │   │   └── attendanceService.js
│   │   │
│   │   ├── utils/
│   │   │   └── auth.js
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js
│       │   └── jwt.js
│       │
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── employeeController.js
│       │   ├── leaveController.js
│       │   └── attendanceController.js
│       │
│       ├── middleware/
│       │   └── authMiddleware.js
│       │
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── em


---

## ⚙️ How to Run the Project

### ✅ Prerequisites
- Node.js (v16+)
- MySQL
- Git

---

## 🔹 1️⃣ Clone the Repository

```bash
git clone https://github.com/GaneshturateSDE/Employee-management-system




