import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.employee.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Login</h2>
      {error && (
        <p className="bg-rose-50 text-rose-600 text-sm rounded-md px-4 py-2 mb-4">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-slate-600 mt-4">
        New here?{" "}
        <Link to="/register" className="text-indigo-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
