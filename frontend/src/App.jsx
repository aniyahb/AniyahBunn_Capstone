import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './HomePage/HomePage';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import SearchedPage from './SearchedPage/SearchedPage';
import FavoriteRecipesPage from './FavoriteRecipesPage/FavoriteRecipesPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")

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
          <Route path="/favorites" element={<FavoriteRecipesPage/>}/>
      </Routes>
    </Router>
    </div>

  );
};


export default App
