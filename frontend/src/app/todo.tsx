import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo } from '../services/api';

interface Todo {
  id: number;
  date: string;
  task: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchTodos(currentDate).then(data => {
      setTodos(data);
    }).catch(error => {
      console.error('Error fetching todos:', error);
    });
  }, [currentDate]);

  const handleAddTodo = () => {
    createTodo({ date: currentDate, task }).then(data => {
      setTodos([...todos, data]);
      setTask('');
    }).catch(error => {
      console.error('Error creating todo:', error);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
