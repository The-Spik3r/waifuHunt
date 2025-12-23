import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const CreateUserBody = z.object({
  name: z.string().min(1).openapi({
    description: "Nombre del usuario",
    example: "John Doe",
  }),
  email: z.string().email().openapi({
    description: "Email del usuario",
    example: "john@example.com",
  }),
  age: z.number().min(0).optional().openapi({
    description: "Edad del usuario",
    example: 25,
  }),
});

export const UserResponse = z.object({
  id: z.string().openapi({
    description: "ID único del usuario",
    example: "u_123",
  }),
  name: z.string().openapi({
    description: "Nombre del usuario",
    example: "John Doe",
  }),
  email: z.string().openapi({
    description: "Email del usuario",
    example: "john@example.com",
  }),
  age: z.number().optional().openapi({
    description: "Edad del usuario",
    example: 25,
  }),
});

export const MessageResponse = z.object({
  message: z.string().openapi({
    description: "Mensaje de respuesta",
    example: "Hello Hono!",
  }),
});

// Tipos inferidos de los schemas
export type CreateUserBody = z.infer<typeof CreateUserBody>;
export type UserResponse = z.infer<typeof UserResponse>;
export type MessageResponse = z.infer<typeof MessageResponse>;
