import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log("Main.tsx is executing");

const rootElement = document.getElementById('root');
console.log("Root element found:", rootElement);

// Use consistent basename for both development and production
const basename = '/warp-the-computer-club/';

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );
  console.log("App has been rendered with basename:", basename);
} else {
  console.error("Root element not found!");
}