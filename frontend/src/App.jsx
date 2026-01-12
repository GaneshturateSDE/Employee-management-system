import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Employees from "./pages/Employee";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";

// Simple auth check (JWT based)
const isAuthenticated = () => {
  return localStorage.getItem("token");
};

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={ isAuthenticated() ?<Navigate to="/" />: <Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/employees"
        element={
          isAuthenticated() ? <Employees /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/leave"
        element={
          isAuthenticated() ? <Leave /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/attendance"
        element={
          isAuthenticated() ? <Attendance /> : <Navigate to="/login" />
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
