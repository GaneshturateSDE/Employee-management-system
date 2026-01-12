import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // HR / EMPLOYEE

  const logout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold flex justify-between items-center">
        <h1>Employee Management System</h1>
        <button
          className="text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-700"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow p-4">
          <ul className="flex flex-col space-y-3 font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600">
              Dashboard
            </Link>

            {/* HR ONLY */}
            {role === "HR" && (
              <Link to="/employees" className="hover:text-blue-600">
                Employees
              </Link>
            )}

            {/* BOTH */}
            <Link to="/leave" className="hover:text-blue-600">
              Leave
            </Link>

            <Link to="/attendance" className="hover:text-blue-600">
              Attendance
            </Link>
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
