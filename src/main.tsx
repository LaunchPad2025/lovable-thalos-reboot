
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { isProduction } from './utils/environmentUtils'

// Only log app initialization in non-production environments
if (!isProduction()) {
  console.log("Initializing Thalos application...");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
