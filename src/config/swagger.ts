import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard Backend API",
      version: "1.0.0",
      description:
        "API documentation for finance data processing and access control backend"
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:8000/api"
      }
    ]
  },
  apis: ["./src/routes/*.ts"] // reads route comments
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};