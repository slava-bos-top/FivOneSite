import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Courses from './components/courses/Courses';
import Gallery from './components/Gallery/Gallery';
import Competition from './components/competition/Competition';
import Main from './components/main/Main';
import Register from './components/register/Register';
import Login from './components/login/Login';
import TelegramLogin from './components/TelegramLogin';

function App() {
  console.log('App rendered');
  return (
    <div className='App' style={{width: "100%"}}>
      <Routes>
        <Route path="/fivone" element={<Main />} className="fivone"/>
        <Route path="/course" element={<Courses />} />
        <Route path="/marathon" element={<Competition />} />
        <Route path="/registration" element={<Register />} />
        <Route path='/login' element={<TelegramLogin />} />
      </Routes>
    </div>
  );
}

export default App;
