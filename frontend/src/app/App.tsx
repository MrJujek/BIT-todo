import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from '../pages/TodoList';
import Login from '../pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App