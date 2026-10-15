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

  return (
    <div>
      <h2>Enquiry Form</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Interest"
          value={courseInterest}
          onChange={(e) => setCourseInterest(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EnquiryForm;
