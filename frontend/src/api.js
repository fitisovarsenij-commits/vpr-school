const API_URL = process.env.REACT_APP_API_URL || "https://vpr-school-ho8w.onrender.com/api";

export async function register(username, password) {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function getProfile(token) {
  const response = await fetch(`${API_URL}/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Token ${token},
    },
  });
  return response.json();
}

export async function getTasks(token) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Token ${token},
    },
  });
  return response.json();
}

export async function submitAnswers(token, answers) {
  const response = await fetch(`${API_URL}/submit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": Token ${token},
    },
    body: JSON.stringify({ answers }),
  });
  return response.json();
}