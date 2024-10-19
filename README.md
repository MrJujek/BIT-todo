# BIT-ToDo
## Running the project
### Frontend

```bash
cd frontend
bun install
bun run build
bun run preview
```

### Backend
To run backend you need to [install mysql](https://dev.mysql.com/downloads/installer/) and create a database named `todos`.
```bash
create database todos;
```

Create .env file in the `backend` folder and add the following:
```bash
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=todos
```

Now you can run the backend:
> [!NOTE]
> You need to have [bun](https://bun.sh/) installed to run the backend.
```bash
cd backend
bun install
bun start
```



