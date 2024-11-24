import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StateProvider } from "./context/StateProvider.js";
import App from './App';
import "./App.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
)
