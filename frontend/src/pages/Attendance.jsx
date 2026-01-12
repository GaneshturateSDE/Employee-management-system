import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  getAttendanceByDate,
  markAttendance
} from "../services/attendanceService";

export default function Attendance() {
  const role = localStorage.getItem("role"); // HR / EMPLOYEE
  const isHR = role === "HR";

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [employees, setEmployees] = useState([]);

  // Fetch attendance when date changes
  const fetchAttendance = async () => {
    const data = await getAttendanceByDate(date);
    setEmployees(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  // Mark attendance (HR only)
  const updateStatus = async (id, status) => {
    if (!isHR) return; // safety check

    await markAttendance({
      id: id,
      status,
      attendanceDate: date
    });

    fetchAttendance();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {isHR ? "Attendance Management" : "My Attendance"}
        </h1>

        {/* HR can change date, employee only views */}
        
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border p-2 rounded"
          />
      
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Employee Name</th>
            <th className="p-3 text-left">Status</th>
            {isHR && <th className="p-3 text-left">Action</th>}
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={isHR ? 3 : 2} className="p-4 text-center text-gray-500">
                No attendance data
              </td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="p-3">{emp.name}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        emp.status === "Present"
                          ? "bg-green-600"
                          : emp.status === "Absent"
                          ? "bg-red-600"
                          : "bg-gray-400"
                      }`}
                  >
                    {emp.status || "Not Marked"}
                  </span>
                </td>

                {/* HR ONLY ACTIONS */}
                {isHR && (
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => updateStatus(emp.id, "Present")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Present
                    </button>

                    <button
                      onClick={() => updateStatus(emp.id, "Absent")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Absent
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}
