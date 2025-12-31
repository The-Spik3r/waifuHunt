import { post } from "./client";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    username?: string;
    displayUsername?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

/**
 * Iniciar sesión con username y contraseña (Better Auth + username plugin)
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  return post<AuthResponse>("/auth/sign-in/username", credentials);
};

/**
 * Registrar un nuevo usuario (Better Auth)
 */
export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  return post<AuthResponse>("/auth/sign-up/email", data);
};

/**
 * Cerrar sesión (Better Auth)
 */
export const logoutUser = async (): Promise<void> => {
  return post<void>("/auth/sign-out");
};

/**
 * Obtener información de la sesión actual (Better Auth)
 */
export const getCurrentSession = async () => {
  return post<AuthResponse>("/auth/get-session");
};

/**
 * Iniciar sesión con Discord OAuth (Better Auth)
 */
export const loginWithDiscord = async (): Promise<void> => {
  // Better Auth maneja OAuth automáticamente
  const authUrl = `${
    import.meta.env.VITE_API_URL || "http://localhost:3000"
  }/api/auth/sign-in/discord`;
  window.location.href = authUrl;
};
