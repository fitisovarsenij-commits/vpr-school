import React, { useState } from 'react';
import { login } from './api';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.access) {
      localStorage.setItem('token', data.access);
      onLogin(data.access);
    } else {
      alert('Ошибка входа');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input placeholder="Имя" value={username} onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}
