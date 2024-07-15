import { useState, useEffect } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './HomePage/HomePage';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';



const App = () => {
  return (
    <div>

      <Router>
      <Routes>

          <Route path='/' element={<SignUp />}/>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/logIn" element={<LogIn/>} />

      </Routes>
    </Router>

    </div>

  );
};


export default App
