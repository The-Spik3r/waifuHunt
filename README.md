# WaifuHunt

A full-stack application built with modern web technologies for managing and discovering waifus.

## 🚀 Technologies

### Backend

- **[Hono](https://hono.dev/)** - Ultrafast web framework for the Edge
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for SQL databases
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[MySQL](https://www.mysql.com/)** - Relational database
- **[OpenAPI](https://www.openapis.org/)** - API documentation and specification

### Frontend

- **[React 19](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[SWC](https://swc.rs/)** - Super-fast TypeScript/JavaScript compiler

### DevOps

- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- Alternatively: [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/installation) for local development

## 🐳 Getting Started with Docker (Recommended)

### 1. Clone the repository

```bash
git clone <repository-url>
cd waifuHunt
```

### 2. Start all services

```bash
docker-compose up --build
```

This command will:

- Build Docker images for backend and frontend
- Start MySQL database
- Start the backend API server
- Start the frontend development server

### 3. Access the application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/reference
- **OpenAPI Spec**: http://localhost:3000/openapi

### 4. Stop all services

Press `Ctrl+C` in the terminal, or run:

```bash
docker-compose down
```

## 💻 Local Development (Without Docker)

### Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

The backend will be available at http://localhost:3000

### Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The frontend will be available at http://localhost:5173

### Database Setup (Local)

If running without Docker, you'll need a MySQL instance:

```bash
# Install MySQL 8.0+
# Create database
mysql -u root -p

CREATE DATABASE waifuhunt;
CREATE USER 'waifuuser'@'localhost' IDENTIFIED BY 'waifupass';
GRANT ALL PRIVILEGES ON waifuhunt.* TO 'waifuuser'@'localhost';
FLUSH PRIVILEGES;
```

## 🔧 Available Scripts

### Backend (`/backend`)

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Drizzle Studio
```

### Frontend (`/frontend`)

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

## 🏗️ Project Structure

```
waifuHunt/
├── backend/
│   ├── src/
│   │   ├── api/          # API routes
│   │   ├── db/           # Database schema and config
│   │   ├── middleware/   # Custom middleware
│   │   ├── repository/   # Data access layer
│   │   └── index.ts      # Entry point
│   ├── drizzle/          # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/       # Static assets
│   │   ├── App.tsx       # Main component
│   │   └── main.tsx      # Entry point
│   └── package.json
├── docker-compose.yml    # Docker services configuration
└── README.md
```

## 🌐 API Endpoints

The API documentation is automatically generated and available at:

- **Interactive Docs**: http://localhost:3000/reference
- **OpenAPI JSON**: http://localhost:3000/openapi

### Main Endpoints

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `GET /api/users/:id` - Get user by ID

## 🔐 Environment Variables

### Backend (`/backend/.env`)

```env
DATABASE_URL=mysql://waifuuser:waifupass@localhost:3306/waifuhunt
NODE_ENV=development
```

### Frontend (`/frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Port already in use

If you get a "port already in use" error:

```bash
# Check what's using the port
lsof -i :3000  # Backend
lsof -i :5173  # Frontend
lsof -i :3307  # MySQL

# Kill the process
kill -9 <PID>
```

### Database connection issues

```bash
# Restart just the database
docker-compose restart mysql

# Check database logs
docker-compose logs mysql
```

### Clean Docker setup

```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
