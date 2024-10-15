import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {NextUIProvider} from "@nextui-org/react";
import TodoApp from './app/todo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <TodoApp />
    </NextUIProvider>
  </StrictMode>,
)
