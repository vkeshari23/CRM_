import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EnquiryForm from "./pages/EnquiryForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/">Enquiry Form</Link>
        {token ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {token && (
          <>
            <span>Hi, {localStorage.getItem("name")}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<EnquiryForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
