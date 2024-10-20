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
    if (selectedOption === 'today' || selectedOption === 'all') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, [selectedOption]);

  useEffect(() => {
    fetchTodos(selectedDate).then(data => {
      setTodos(data);
    }).catch(error => {
      console.log("No todos found");

      setTodos([]);
    });
  }, [selectedDate]);

  const handleAddTodo = (TaskContent: string) => {
    createTodo({ date: selectedDate, task: TaskContent }).then(data => {
      setTodos([data, ...todos]);
    }).catch(error => {
      console.log('Error creating todo:', error);
    });
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const handleToggleTodo = (id: number, checked: boolean) => {
    patchTodo(id, checked).then(data => {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }).catch(error => {
      console.error('Error updating todo:', error);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col ">
      <AppNavbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <div className='flex flex-col p-6 w-full items-center justify-center'>
        <div className='flex flex-col w-full max-w-[976px]'>
          <AddNewTask handleAddTodo={handleAddTodo} />

          <div className='w-full flex items-center justify-center mt-4'>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {selectedOption === 'today'
                ? 'Today tasks' : selectedOption === 'all'
                  ? 'All tasks' : `Tasks from ${selectedDate}`}
            </span>
          </div>

          {todos.length === 0 && (
            <div className='w-full pt-16 flex items-center justify-center mt-4'>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>No tasks found</span>
            </div>
          )}

          <ul>
            {selectedOption === 'today' && todos.filter(todo => todo.date === selectedDate).map(todo => (
              <li key={todo.id} style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
                <Checkbox
                  isSelected={todo.checked}
                  lineThrough
                  onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
                >
                  {todo.task}
                </Checkbox>
              </li>
            ))}
            {selectedOption === 'all' && todos.map(todo => (
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
    </div >
  );
};

export default TodoList;
