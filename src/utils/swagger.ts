import { Express, Request, Response, NextFunction } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const PORT = 3000;
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management System REST API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
      {
        url: "https://book-management-api-oz2l.onrender.com",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../../openapi.yaml")],
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).render("unauthorized", {
    message: "Please log in to view API documentation.",
  });
};

function swaggerDocs(app: Express, port: number) {
  if (
    options.definition &&
    Array.isArray((options.definition as any).servers) &&
    (options.definition as any).servers.length > 0
  ) {
    (options.definition as any).servers[0].url = `http://localhost:${port}`;
  }

  const updatedSpec = swaggerJsdoc(options);

  app.use(
    "/api-docs",
    isAuthenticated,
    swaggerUi.serve,
    swaggerUi.setup(updatedSpec)
  );

  app.get("/docs.json", isAuthenticated, (req: Request, res: Response) => {
    res.setHeader("Content-type", "application/json");
    res.send(updatedSpec);
  });

  console.log(
    `Docs available at http://localhost:${port}/api-docs (Login required)`
  );
}

export default swaggerDocs;
