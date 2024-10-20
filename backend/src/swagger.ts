import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BIT-todo API",
      version: "1.0.0",
      description: "API documentation for BIT-todo project",
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
