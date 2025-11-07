import React, { useState } from 'react';
import TestPage from './TestPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import RegisterPage from './RegisterPage';

function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{fontFamily:'Arial', padding:20}}>
      <h1>vpr-school</h1>
      {!token ? (
        <>
          {showRegister ? (
            <>
              <RegisterPage/>
              <button onClick={()=>setShowRegister(false)}>Уже есть аккаунт? Войти</button>
            </>
          ) : (
            <>
              <LoginPage onLogin={setToken}/>
              <button onClick={()=>setShowRegister(true)}>Регистрация</button>
            </>
          )}
        </>
      ) : (
        <>
          <button onClick={()=>{localStorage.removeItem('token');setToken(null);}}>Выйти</button>
          <ProfilePage token={token}/>
          <TestPage/>
        </>
      )}
    </div>
  );
}
export default App;
