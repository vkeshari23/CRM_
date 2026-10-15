import { useState } from "react";
import api from "../api.js";

function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.post("/enquiries", { name, email, phone, courseInterest });
      setMessage("Thank you! Your enquiry has been submitted.");
      setName("");
      setEmail("");
      setPhone("");
      setCourseInterest("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Enquiry Form</h2>
      <p className="text-sm text-slate-500 mb-6">
        Fill in your details and our counselor will reach out to you.
      </p>
      {message && (
        <p className="bg-emerald-50 text-emerald-600 text-sm rounded-md px-4 py-2 mb-4">
          {message}
        </p>
      )}
      {error && (
        <p className="bg-rose-50 text-rose-600 text-sm rounded-md px-4 py-2 mb-4">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Course Interest"
          value={courseInterest}
          onChange={(e) => setCourseInterest(e.target.value)}
          className={inputClass}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}

export default EnquiryForm;
