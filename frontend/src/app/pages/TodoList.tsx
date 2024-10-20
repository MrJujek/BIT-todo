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
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedOption, setSelectedOption] = useState<'today' | 'all' | 'custom'>('today');

  useEffect(() => {
    fetchTodos(selectedDate).then(data => {
      setTodos(data);
    }).catch(error => {
      console.error('Error fetching todos:', error);
    });
  }, [selectedDate]);

  const handleAddTodo = (TaskContent: string) => {
    createTodo({ date: selectedDate, task: TaskContent }).then(data => {
      setTodos([data, ...todos]);
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
      <AppNavbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <div className='flex flex-col p-6'>
        <div className='w-full flex items-center justify-center'>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
            {selectedOption === 'today'
              ? 'Today tasks' : selectedOption === 'all'
                ? 'All tasks' : `Tasks from ${selectedDate}`}
          </span>
        </div>

        <AddNewTask handleAddTodo={handleAddTodo} />

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
    </div >
  );
};

export default TodoList;
