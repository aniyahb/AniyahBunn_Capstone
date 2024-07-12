import { useState } from 'react'
import { Link, BrowserRouter } from 'react-router-dom';
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import LogInSignUp from './LogInSignUp/LogInSignUp'
import Profile from './Profile/Profile'




function App() {

  return(
    <header className='App-Header'>
      <h1>MealMaster<span><Profile/></span></h1>
    <SearchBar/>
    </header>




  )
}

export default App
