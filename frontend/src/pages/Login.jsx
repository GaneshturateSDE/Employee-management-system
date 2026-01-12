import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authservice";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(formData);

      // Save auth details
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      // localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
         location.reload()
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            className="w-full border p-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white
              ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
