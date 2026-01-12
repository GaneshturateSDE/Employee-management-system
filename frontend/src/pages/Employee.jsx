import Layout from "../components/Layout";
import {
  getEmployees,
  createEmployee,
  updateEmployee
} from "../services/employeeServices";
import { useEffect, useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form submit
  const handleSubmit = async() => {
   
    if (isEdit) {
      await updateEmployee(editId, formData);
    } else {
      await createEmployee(formData);
    }

    resetForm();
    fetchEmployees();
  };

  // Edit button click
  const handleEdit = emp => {
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role
    });
    setEditId(emp.id);
    setIsEdit(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "" });
    setIsEdit(false);
    setEditId(null);
  };

  return (
    <Layout>
      {/* FORM */}
      <div className="bg-white p-6 rounded shadow w-1/2 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Name"
            value={formData.name}
            onChange={e =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={e =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-2 mb-4 rounded"
            placeholder="Role"
            value={formData.role}
            onChange={e =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          />

          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              {isEdit ? "Update" : "Save"}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} className="border-t">
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.role}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
