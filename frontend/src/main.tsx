import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, AppHeader, AppFooter } from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('header')!).render(
  <React.StrictMode> 
    <AppHeader />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('footer')!).render(
  <React.StrictMode> 
    <AppFooter />
  </React.StrictMode>,
)