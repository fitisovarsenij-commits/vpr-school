const API_URL = 'http://localhost:8000/api';

export async function register(username, password) {
  const res = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  return await res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  return await res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_URL}/profile/`, {
    headers: {'Authorization': `Bearer ${token}`}
  });
  return await res.json();
}
