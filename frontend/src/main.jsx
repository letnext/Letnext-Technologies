import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'));

// INP: Use startTransition so initial render doesn't block user interactions
startTransition(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

