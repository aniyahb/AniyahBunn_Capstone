import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LogInSignUp from './LogInSignUp/LogInSignUp.jsx'
import RecipeCard from './RecipeCard/RecipeCard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipeCard/>
  </React.StrictMode>,
)
