import Layout from "../components/Layout";
import {
  applyLeave,
  getLeaves,
  getMyLeaves,
  updateLeaveStatus
} from "../services/leaveService";
import { useEffect, useState } from "react";

export default function Leave() {
  const role = localStorage.getItem("role"); // HR / EMPLOYEE
  const isHR = role === "HR";

  // Employee leave form
  const [formData, setFormData] = useState({
    reason: "",
    fromDate: "",
    toDate: ""
  });

  // Leave list
  const [leaves, setLeaves] = useState([]);

  // Fetch leaves based on role
  const fetchLeaves = async () => {
    const data = isHR ? await getLeaves() : await getMyLeaves();
    setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Apply leave (EMPLOYEE only)
  const handleSubmit = async e => {
    e.preventDefault();
    if (isHR) return;

    await applyLeave(formData);
    setFormData({ reason: "", fromDate: "", toDate: "" });
    fetchLeaves();
  };

  // Approve / Reject (HR only)
  const handleStatusUpdate = async (id, status) => {
    if (!isHR) return;

    await updateLeaveStatus(id, status);
    fetchLeaves();
  };

  return (
    <Layout>
      {/* APPLY LEAVE — EMPLOYEE ONLY */}
      {!isHR && (
        <div className="bg-white p-6 rounded-lg shadow w-1/2 mb-10">
          <h2 className="text-xl font-semibold mb-4">Apply Leave</h2>

          <form onSubmit={handleSubmit}>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Reason for Leave"
              value={formData.reason}
              onChange={e =>
                setFormData({ ...formData, reason: e.target.value })
              }
              required
            />

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="text-sm text-gray-600">From Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={formData.fromDate}
                  onChange={e =>
                    setFormData({ ...formData, fromDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="text-sm text-gray-600">To Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={formData.toDate}
                  onChange={e =>
                    setFormData({ ...formData, toDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Submit Leave Request
            </button>
          </form>
        </div>
      )}

      {/* LEAVE LIST */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b">
          {isHR ? "All Leave Requests" : "My Leave Requests"}
        </h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {isHR && <th className="p-3 text-left">Employee</th>}
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Status</th>
              {isHR && <th className="p-3 text-left">Action</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isHR ? 6 : 4}
                  className="p-4 text-center text-gray-500"
                >
                  No leave requests
                </td>
              </tr>
            ) : (
              leaves.map(leave => (
                <tr key={leave.id} className="border-t">
                  {isHR && (
                    <td className="p-3">{leave.employee_name}</td>
                  )}
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">
                    {leave.from_date.split("T")[0]}
                  </td>
                  <td className="p-3">
                    {leave.to_date.split("T")[0]}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          leave.status === "Approved"
                            ? "bg-green-600"
                            : leave.status === "Rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {/* HR ACTIONS ONLY */}
                  {isHR && (
                    <td className="p-3 space-x-2">
                      {leave.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(leave.id, "Approved")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(leave.id, "Rejected")
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
