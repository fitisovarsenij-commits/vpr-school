import React, { useEffect, useState } from 'react';
import { getProfile } from './api';

export default function ProfilePage({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile(token).then(setProfile);
  }, [token]);

  if (!profile) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Личный кабинет {profile.username}</h2>
      <p>Средний балл: {profile.average_score}</p>
      <h3>Результаты:</h3>
      <ul>
        {profile.results.map((r, i)=>(
          <li key={i}>{r.subject}: {r.score} баллов ({r.timestamp})</li>
        ))}
      </ul>
    </div>
  );
}
