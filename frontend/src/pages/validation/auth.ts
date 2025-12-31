import { z } from "zod";

// Schema de validación para login
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es requerido")
    .max(30, "El nombre de usuario no puede exceder 30 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Schema de validación para registro
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .max(255, "El nombre no puede exceder 255 caracteres"),
    email: z.string().min(1, "El email es requerido").email("Email inválido"),
    username: z
      .string()
      .min(3, "El username debe tener al menos 3 caracteres")
      .max(30, "El username no puede exceder 30 caracteres")
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        "Solo letras, números, guiones bajos y puntos"
      ),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(128, "La contraseña no puede exceder 128 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
