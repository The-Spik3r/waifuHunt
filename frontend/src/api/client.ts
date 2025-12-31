import axios, { type AxiosRequestConfig, AxiosError } from "axios";

// Configuración base para las llamadas a la API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Crear instancia de axios con configuración base
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const message =
        error.response.data?.message || `Error ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      throw new Error("No se pudo conectar con el servidor");
    } else {
      // Algo pasó al configurar la petición
      throw new Error(error.message || "Error desconocido en la solicitud");
    }
  }
);

interface ApiClientOptions extends AxiosRequestConfig {
  token?: string;
}

/**
 * Cliente HTTP personalizado para hacer llamadas a la API
 */
export const apiClient = async <T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const { token, ...axiosOptions } = options;

  const config: AxiosRequestConfig = {
    ...axiosOptions,
    url: endpoint,
  };

  // Si se proporciona un token específico, sobrescribir el del localStorage
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axiosInstance.request<T>(config);
  return response.data;
};

/**
 * Helper para hacer peticiones GET
 */
export const get = <T>(endpoint: string, options?: ApiClientOptions) => {
  return apiClient<T>(endpoint, { ...options, method: "GET" });
};

/**
 * Helper para hacer peticiones POST
 */
export const post = <T>(
  endpoint: string,
  data?: unknown,
  options?: ApiClientOptions
) => {
  return apiClient<T>(endpoint, {
    ...options,
    method: "POST",
    data,
  });
};

/**
 * Helper para hacer peticiones PUT
 */
export const put = <T>(
  endpoint: string,
  data?: unknown,
  options?: ApiClientOptions
) => {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PUT",
    data,
  });
};

/**
 * Helper para hacer peticiones PATCH
 */
export const patch = <T>(
  endpoint: string,
  data?: unknown,
  options?: ApiClientOptions
) => {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PATCH",
    data,
  });
};

/**
 * Helper para hacer peticiones DELETE
 */
export const del = <T>(endpoint: string, options?: ApiClientOptions) => {
  return apiClient<T>(endpoint, { ...options, method: "DELETE" });
};
