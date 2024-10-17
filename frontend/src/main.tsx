import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import { NextUIProvider } from "@nextui-org/react";
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
)
