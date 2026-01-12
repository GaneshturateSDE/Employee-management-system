import api from "../config/api.js";


export const login = async credentials => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
