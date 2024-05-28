import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
