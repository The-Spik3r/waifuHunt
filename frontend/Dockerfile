FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando de inicio en desarrollo
CMD ["pnpm", "dev", "--host"]
