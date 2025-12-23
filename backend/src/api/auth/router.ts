import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator as zValidator } from "hono-openapi/zod";
import { z } from "zod";
import {
  SignUpBody,
  SignInBody,
  AuthResponse,
  SuccessResponse,
} from "./validation";

// Estos endpoints son solo para documentación en Scalar
// Better Auth maneja las rutas reales en /api/auth/**
export const authRoute = new Hono()
  .post(
    "/sign-up/email",
    zValidator("json", SignUpBody),
    describeRoute({
      tags: ["Auth"],
      description: "Registrar un nuevo usuario con email y contraseña",
    }),
    (c) => c.json({ message: "Handled by Better Auth" })
  )
  .post(
    "/sign-in/email",
    zValidator("json", SignInBody),
    describeRoute({
      tags: ["Auth"],
      description: "Iniciar sesión con email y contraseña",
    }),
    (c) => c.json({ message: "Handled by Better Auth" })
  )
  .post(
    "/sign-out",
    describeRoute({
      tags: ["Auth"],
      description: "Cerrar sesión del usuario actual",
    }),
    (c) => c.json({ message: "Handled by Better Auth" })
  )
  .get(
    "/session",
    describeRoute({
      tags: ["Auth"],
      description: "Obtener información de la sesión actual",
    }),
    (c) => c.json({ message: "Handled by Better Auth" })
  );
