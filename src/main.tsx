import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '@/App.tsx';
import { TasksApiPractice } from './components/TasksApiPractice';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <TasksApiPractice />
  </StrictMode>,
);
