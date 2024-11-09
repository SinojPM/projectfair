import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import ContextsShare from './context/ContextsShare.jsx'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
      <AuthContext>
        <ContextsShare>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextsShare>
      </AuthContext>
   
   
  </StrictMode>,
)
