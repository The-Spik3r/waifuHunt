import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const SignUpBody = z.object({
  email: z.string().email().openapi({
    description: "Email del usuario",
    example: "user@example.com",
  }),
  password: z.string().min(8).openapi({
    description: "Contraseña del usuario (mínimo 8 caracteres)",
    example: "securepassword123",
  }),
  name: z.string().min(1).openapi({
    description: "Nombre del usuario",
    example: "John Doe",
  }),
});

export const SignInBody = z.object({
  email: z.string().email().openapi({
    description: "Email del usuario",
    example: "user@example.com",
  }),
  password: z.string().openapi({
    description: "Contraseña del usuario",
    example: "securepassword123",
  }),
});

export const AuthUserResponse = z.object({
  id: z.string().openapi({
    description: "ID único del usuario",
    example: "user_123",
  }),
  email: z.string().openapi({
    description: "Email del usuario",
    example: "user@example.com",
  }),
  name: z.string().openapi({
    description: "Nombre del usuario",
    example: "John Doe",
  }),
});

export const SessionResponse = z.object({
  token: z.string().openapi({
    description: "Token de sesión",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  }),
  expiresAt: z.string().openapi({
    description: "Fecha de expiración de la sesión",
    example: "2025-12-24T00:00:00.000Z",
  }),
});

export const AuthResponse = z.object({
  user: AuthUserResponse.openapi({
    description: "Información del usuario autenticado",
  }),
  session: SessionResponse.openapi({
    description: "Información de la sesión",
  }),
});

export const SuccessResponse = z.object({
  success: z.boolean().openapi({
    description: "Indica si la operación fue exitosa",
    example: true,
  }),
});

// Tipos inferidos de los schemas
export type SignUpBody = z.infer<typeof SignUpBody>;
export type SignInBody = z.infer<typeof SignInBody>;
export type AuthUserResponse = z.infer<typeof AuthUserResponse>;
export type SessionResponse = z.infer<typeof SessionResponse>;
export type AuthResponse = z.infer<typeof AuthResponse>;
export type SuccessResponse = z.infer<typeof SuccessResponse>;
