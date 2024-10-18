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

export const patchTodo = async (id: number, checked: boolean) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checked }),
  });
  if (!response.ok) {
    throw new Error(`Error patching todo: ${response.statusText}`);
  }
  return response.json();
};

export const loginUser = async (login: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });
  if (!response.ok) {
    throw new Error(`Error logging in: ${response.statusText}`);
  }
  return response.json();
}

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    throw new Error(`Error creating user: ${response.statusText}`);
  }
  return response.json();
}