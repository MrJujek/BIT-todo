const API_URL = "/api";

export const fetchTodos = async (date: string) => {
  const response = await fetch(`${API_URL}/todos/${date}`);
  if (!response.ok) {
    throw new Error(`Error fetching todos: ${response.statusText}`);
  }
  return response.json();
};

export const createTodo = async (todo: { date: string; task: string }) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(`Error creating todo: ${response.statusText}`);
  }
  return response.json();
};

export const patchTodo = async (id: number, checked: boolean) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ checked }),
  });
  if (!response.ok) {
    throw new Error(`Error patching todo: ${response.statusText}`);
  }
  return response.json();
};

export const loginUser = async (login: string, password: string) => {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  if (!response.ok) {
    throw new Error(`Error logging in: ${response.statusText}`);
  }
  return response.json();
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(response);

  if (response.status == 400) {
    return response.json();
  } else if (!response.ok) {
    throw new Error(`Error registering user: ${response.statusText}`);
  }
  return response.json();
};

export const authUser = async () => {
  const response = await fetch(`${API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error authenticating user: ${response.statusText}`);
  }
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/users/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error logging out: ${response.statusText}`);
  }
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting todo: ${response.statusText}`);
  }
  return response.json();
}

export const changeTodo = async (id: number, task: string) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) {
    throw new Error(`Error changing task: ${response.statusText}`);
  }
  return response.json();
}