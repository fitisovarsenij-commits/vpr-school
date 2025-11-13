import React, {useState, useEffect} from 'react';

export default function TestPage(){
  const [tasks, setTasks] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(()=>{
    fetch('http://localhost:8000/api/tasks/')
      .then(r=>r.json())
      .then(setTasks)
      .catch(e=>console.error('Fetch tasks failed', e));
  },[]);

  const handleChange = (idx, val) => {
    setAnswers(prev => ({...prev, [idx]: val}));
  };

  const handleSubmit = () => {
    const task_ids = tasks.map(t=>t.id);
    const orderedAnswers = task_ids.map((_,i)=>answers[i] || '');
    fetch('http://localhost:8000/api/submit/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({task_ids, answers: orderedAnswers})
    }).then(r=>r.json())
      .then(data=>alert('Score: '+data.score+'\n'+(data.recommendations||[]).join('\n')))
      .catch(e=>console.error(e));
  };

  return (
    <div>
      <h2>Тест</h2>
      {tasks.length===0 && <p>Загрузка заданий...</p>}
      {tasks.map((t, i)=> (
        <div key={t.id} style={{marginBottom:15}}>
          <div><strong>Задание {i+1}:</strong> {t.text}</div>
          <input onChange={e=>handleChange(i, e.target.value)} placeholder="Ваш ответ" />
        </div>
      ))}
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}
