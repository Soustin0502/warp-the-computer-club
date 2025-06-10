
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log("Main.tsx is executing");

const rootElement = document.getElementById('root');
console.log("Root element found:", rootElement);

if (rootElement) {
  console.log("About to render App component");
  createRoot(rootElement).render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  console.log("App has been rendered");
} else {
  console.error("Root element not found!");
}
