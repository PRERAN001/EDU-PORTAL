import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  SubjectContextProvider  from './context/Subjectcontext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubjectContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SubjectContextProvider>
  </StrictMode>
)
