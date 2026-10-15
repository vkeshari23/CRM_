import { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EnquiryForm from "./pages/EnquiryForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setOpen(false);
    navigate("/login");
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  const links = (
    <>
      <Link to="/" className={linkClass("/")} onClick={() => setOpen(false)}>
        Enquiry Form
      </Link>
      {token ? (
        <>
          <Link to="/dashboard" className={linkClass("/dashboard")} onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition text-left"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={linkClass("/login")} onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link to="/register" className={linkClass("/register")} onClick={() => setOpen(false)}>
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 shadow-lg sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="text-white font-bold text-xl tracking-wide">
              CRM<span className="text-indigo-400">Portal</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1">{links}</div>

            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden text-slate-200 border border-slate-600 rounded-md px-3 py-1.5 text-sm font-medium"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          {open && (
            <div className="sm:hidden flex flex-col gap-2 pb-4">{links}</div>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Routes>
          <Route path="/" element={<EnquiryForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
