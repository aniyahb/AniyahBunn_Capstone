import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import RecipeCard from './RecipeCard/RecipeCard.jsx'
import LogIn from './LogIn/LogIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import { BrowserRouter } from 'react-router-dom'
import RecipeList from './RecipeList/RecipeList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App/>

  </React.StrictMode>

)
