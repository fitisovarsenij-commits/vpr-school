import React, { useState } from 'react';
import { register } from './api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const data = await register(username, password);
    if (data.username) {
      setMessage(`Пользователь ${data.username} создан. Теперь войдите.`);
    } else {
      setMessage(data.error || 'Ошибка регистрации');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <input placeholder="Имя" value={username} onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <p>{message}</p>
    </div>
  );
}
