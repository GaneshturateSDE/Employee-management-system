import api from "../config/api";

// Employee applies leave
export const applyLeave = async data => {
  const res = await api.post("/leaves", data);
  return res.data;
};
export const getMyLeaves = async () =>
  (await api.get("/leaves/my")).data;


// HR fetches leave requests
export const getLeaves = async () => {
  const res = await api.get("/leaves");
  return res.data;
};

// HR updates leave status
export const updateLeaveStatus = async (id, status) => {
  const res = await api.put(`/leaves/${id}`, { status });
  return res.data;
};
