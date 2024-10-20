import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, patchTodo, deleteTodo, changeTodo } from '../services/api';
import AddNewTask from '../components/AddNewTask';
import AppNavbar from '../components/AppNavbar';
import Task from '../components/Task';

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
    if (selectedOption === 'today') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    } else if (selectedOption === 'all') {
      setSelectedDate('all');
    }
  }, [selectedOption]);

  useEffect(() => {
    fetchTodos(selectedDate).then(data => {
      setTodos(data);
    }).catch(() => {
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

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    }).catch(error => {
      console.error('Error deleting todo:', error);
    });
  }

  const handleEditTodo = (id: number, task: string) => {
    changeTodo(id, task).then(data => {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }).catch(error => {
      console.error('Error updating todo:', error);
    });
  }

  return (
    <div className="w-full h-screen flex flex-col ">
      <AppNavbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} setSelectedDate={setSelectedDate} />

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

          <ul className='pt-8'>
            {selectedOption === 'today' && todos.filter(todo => todo.date === selectedDate).map(todo => (
              <Task
                key={todo.id}
                todo={todo}
                handleToggleTodo={handleToggleTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            ))}
            {selectedOption === 'all' && todos.map(todo => (
              <Task
                key={todo.id}
                todo={todo}
                handleToggleTodo={handleToggleTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            ))}
            {selectedOption === 'custom' && todos.filter(todo => todo.date === selectedDate).map(todo => (
              <Task
                key={todo.id}
                todo={todo}
                handleToggleTodo={handleToggleTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
};

export default TodoList;
