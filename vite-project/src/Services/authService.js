import axios from "axios";

const API = "https://your-api-url.com/api/auth";

export const loginUser = async ({ username, password }) => {
  try {
    const res = await axios.post(`${API}/login`, {
      username,
      password,
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
