const API_URL = process.env.REACT_APP_API_URL || "https://vpr-school-ho8w.onrender.com/api";

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
    ...options,
  });
  if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
  return response.json();
}
export { API_URL };
export async function login(username, password) {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}