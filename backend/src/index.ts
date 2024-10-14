import express, { type Request, type Response , type Application } from 'express';

const app: Application = express();
const port = 5500;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});