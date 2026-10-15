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

  const tabClass = (name) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      tab === name
        ? "bg-indigo-600 text-white shadow"
        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
    }`;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome, {localStorage.getItem("name")}
        </h2>
        <p className="text-sm text-slate-500">
          Manage your leads and claim new enquiries below.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button className={tabClass("public")} onClick={() => setTab("public")}>
          Unclaimed Leads ({publicLeads.length})
        </button>
        <button className={tabClass("mine")} onClick={() => setTab("mine")}>
          My Leads ({myLeads.length})
        </button>
      </div>

      {error && (
        <p className="bg-rose-50 text-rose-600 text-sm rounded-md px-4 py-2 mb-4">
          {error}
        </p>
      )}

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-center py-12">No leads found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate">{lead.name}</h3>
                  <p className="text-sm text-slate-500 truncate">{lead.email}</p>
                </div>
                <span className="shrink-0 bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-xs font-medium">
                  {lead.courseInterest}
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-3">Phone: {lead.phone || "-"}</p>

              {tab === "public" && (
                <button
                  onClick={() => claimLead(lead._id)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md text-sm font-medium transition"
                >
                  Claim Lead
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
