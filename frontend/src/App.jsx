import { useState, useEffect } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './HomePage/HomePage';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import SearchedPage from './SearchedPage/SearchedPage';
import { func } from 'prop-types';



const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  console.log(searchQuery)

  function handleSearchQuery(query){
    setSearchQuery(query)
  }
  return (
    <div>

      <Router>
      <Routes>

          <Route path='/' element={<SignUp />}/>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/homepage" element={<HomePage setSearch={handleSearchQuery}/>} />
          <Route path="/logIn" element={<LogIn/>} />
          <Route path="/searched/:search" element={<SearchedPage query={searchQuery}/>}/>

      </Routes>
    </Router>

    </div>

  );
};


export default App
