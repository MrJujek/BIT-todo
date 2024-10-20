import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import TodoList from './pages/TodoList';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react'
import { authUser } from './services/api';

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const data = await authUser();
        setUser(data.username);
        setLoading(false);
      } catch (error) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setLoading(false);
      }
    }, 0)
  }, [])

  return (
    <>
      {loading ? <div className="flex justify-center items-center h-screen">
        <Spinner /></div> :
        user ? <Outlet /> : <Navigate to="/signin" replace />}
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
        <Route path='/signup' element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App