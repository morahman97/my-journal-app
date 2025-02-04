import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './app';

// const root = createRoot(document.body);
// root.render(
//     <App />
// );

// document.body.innerHTML = '<div id="root"></div>';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )