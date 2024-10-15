import React, { useState, ChangeEvent } from 'react';

interface Todo {
  id: number;
  task: string;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(1);

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value);

  const addTodo = () => {
    setTodos([...todos, { id: idCounter, task }]);
    setTask('');
    setIdCounter(idCounter + 1);
  };

  return (
    <div>
      <input value={task} onChange={handleTaskChange} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
