const BASE_URL = import.meta.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const signup = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const addPassword = async (data) => {
  const res = await fetch(`${BASE_URL}/passwords/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const listPasswords = async (user_id) => {
  const res = await fetch(`${BASE_URL}/passwords/list/${user_id}`);
  return res.json();
};
