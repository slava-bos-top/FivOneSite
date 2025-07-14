import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Courses from './components/courses/Courses';
import Competition from './components/competition/Competition';
import Main from './components/main/Main';
import TelegramLogin from './components/TelegramLogin';
import TelegramCallback from './components/TelegramCallback';

function App() {
  console.log('App rendered');
  return (
    <div className='App' style={{width: "100%"}}>
      <Routes>
        <Route path="/" element={<Main />} className="fivone"/>
        <Route path="/course" element={<Courses />} />
        <Route path="/marathon" element={<Competition />} />
        <Route path='/login' element={<TelegramLogin />} />
        <Route path="/telegram-callback" element={<TelegramCallback />} />
      </Routes>
    </div>
  );
}

export default App;
