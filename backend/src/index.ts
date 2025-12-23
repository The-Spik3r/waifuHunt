import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { HTTPException } from "hono/http-exception";
import { prettyJSON } from "hono/pretty-json";
import { inyectDependencyContainer } from "./api/middleware/inyectContainer";
import api from "./api";

export const app = new Hono();

// Middlewares globales
app.use("*", prettyJSON());
app.use("*", inyectDependencyContainer);

// Ruta principal
app.get(
  "/",
  describeRoute({
    tags: ["General"],
    description: "Endpoint de bienvenida",
    responses: {
      200: {
        description: "Respuesta exitosa",
      },
    },
  }),
  (c) => {
    return c.json({ message: "Hello Hono!" });
  }
);

// Registrar rutas de la API
app.route("/api", api);
app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "WaifuHunt API",
        version: "1.0.0",
        description:
          "API documentada automáticamente con hono-openapi + Scalar utilizando Zod para validación de schemas",
      },
      tags: [
        {
          name: "General",
          description: "Endpoints generales de la aplicación",
        },
        {
          name: "Users",
          description:
            "Endpoints para la gestión de usuarios, incluyendo creación, consulta y actualización de información",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  })
);

// --- Scalar UI ---
app.get(
  "/reference",
  apiReference({
    url: "/openapi",
  })
);

// Manejo de errores
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ code: err.status, message: err.message }, err.status);
  }

  console.error(err);
  return c.json({ code: 500, message: "Internal Server Error" }, 500);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
    console.log(`API Reference: http://localhost:${info.port}/reference`);
    console.log(`OpenAPI Spec: http://localhost:${info.port}/openapi`);
  }
);
