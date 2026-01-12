import api from "../config/api.js";

export const markAttendance = async data => {
  const res = await api.post("/attendance", data);
  return res.data;
};

export const getAttendanceByDate = async (date) => {
  const res = await api.get("/attendance", {
    params: { date }
  });
  return res.data;
};