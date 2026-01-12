import api from "../config/api.js";


export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async data => {
  console.log("Creating employee with data:", data);
  const res = await api.post("/employees", data);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};
