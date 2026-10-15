import { useState, useEffect } from "react";
import api from "../api.js";

function Dashboard() {
  const [tab, setTab] = useState("public");
  const [publicLeads, setPublicLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    setError("");
    try {
      const publicRes = await api.get("/enquiries/public");
      const myRes = await api.get("/enquiries/private");
      setPublicLeads(publicRes.data.enquiries);
      setMyLeads(myRes.data.enquiries);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const claimLead = async (id) => {
    try {
      await api.patch(`/enquiries/${id}/claim`);
      loadLeads();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const leads = tab === "public" ? publicLeads : myLeads;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="tabs">
        <button onClick={() => setTab("public")}>
          Unclaimed Leads ({publicLeads.length})
        </button>
        <button onClick={() => setTab("mine")}>
          My Leads ({myLeads.length})
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              {tab === "public" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.courseInterest}</td>
                {tab === "public" && (
                  <td>
                    <button onClick={() => claimLead(lead._id)}>Claim</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
