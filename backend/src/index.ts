import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./dataSource";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import swaggerSetup from "./swagger";

const app = express();
const PORT = 5500;

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());

    app.use("/", userRoutes);
    app.use("/", todoRoutes);

    swaggerSetup(app);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
