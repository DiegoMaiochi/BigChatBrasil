import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginScreen from './components/LoginScreen.jsx'
import MainRoutes from './MainRoutes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainRoutes/>
  </StrictMode>,
)
