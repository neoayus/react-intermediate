import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import Index from './01-usePopcorn/Index.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
    // <Index />
  // </StrictMode>,
)
