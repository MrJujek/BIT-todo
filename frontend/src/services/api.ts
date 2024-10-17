const API_URL = '/api';

export const fetchTodos = async (date: string) => {
  const response = await fetch(`${API_URL}/todos/${date}`);
  if (!response.ok) {
    throw new Error(`Error fetching todos: ${response.statusText}`);
  }
  return response.json();
};

export const createTodo = async (todo: { date: string, task: string }) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  if (!response.ok) {
    throw new Error(`Error creating todo: ${response.statusText}`);
  }
  return response.json();
};
