import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import TodoList from './pages/TodoList';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser('user');
      setLoading(false);
    }, 0)
  }, [])

  return (
    <>
      {loading ? <div>Loading...</div> :
        user ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodoList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App