import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, patchTodo } from '../services/api';
import { Checkbox } from '@nextui-org/react';
import AddNewTask from '../components/AddNewTask';
import AppNavbar from '../components/AppNavbar';

interface Todo {
  id: number;
  date: string;
  task: string;
  checked: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchTodos(selectedDate).then(data => {
      setTodos(data);
    }).catch(error => {
      console.error('Error fetching todos:', error);
    });
  }, [selectedDate]);

  const handleAddTodo = () => {
    createTodo({ date: selectedDate, task }).then(data => {
      setTodos([...todos, data]);
      setTask('');
    }).catch(error => {
      console.error('Error creating todo:', error);
    });
  };

  const handleToggleTodo = (id: number, checked: boolean) => {
    patchTodo(id, checked).then(data => {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }).catch(error => {
      console.error('Error updating todo:', error);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <AppNavbar />

      <div className='flex flex-col p-6'>
        <AddNewTask />
        {/* <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button> */}
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
              <Checkbox
                checked={todo.checked}
                lineThrough
                onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
              >
                {todo.task}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
