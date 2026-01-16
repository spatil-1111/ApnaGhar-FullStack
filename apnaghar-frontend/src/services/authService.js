import api from "./api";

// Register user
export const registerUser = (registerData) => {
  return api.post("/auth/register", registerData);
};

// Login user
export const loginUser = (loginData) => {
  return api.post("/auth/login", loginData);
};
