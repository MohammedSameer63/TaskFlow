# Taskflow

Taskflow is a minimal backend service built to practice **correct backend engineering fundamentals** rather than feature-heavy application logic.

The goal of this project is to understand how a backend **starts, runs, fails, and shuts down** in a predictable and explainable way.

This repository intentionally keeps features simple and focuses on lifecycle discipline.

---

## Why this project exists

Most backend projects focus on adding features quickly.
This project focuses on **operating a backend correctly**.

Specifically, Taskflow was built to practice:

- Safe startup and shutdown
- Environment validation
- Database lifecycle management
- Health checks and observability
- Containerized execution
- Clear separation between platform and domain code

---

## Tech Stack

- **Node.js** (Express)
- **PostgreSQL**
- **Prisma ORM**
- **Docker & Docker Compose**
- **JWT-based authentication**

---

## Architecture Overview

The project is intentionally divided into two layers:

### Platform layer (reusable)
This layer handles **how the system runs**, independent of business logic.

Includes:
- Application startup and shutdown
- Environment validation
- Database connection lifecycle
- Logging
- Health checks
- Docker and Compose configuration

These files rarely change and can be reused across projects.

### Domain layer (replaceable)
This layer defines **what the application does**.

Includes:
- Authentication
- Domain models (e.g. Tasks)
- Business rules
- API routes

This layer is expected to change between projects.

---

## Startup behavior

On startup, the application:

1. Loads environment variables
2. Validates required configuration (e.g. `JWT_SECRET`)
3. Starts the HTTP server
4. Connects to the database

If required configuration is missing, the application **fails fast** and refuses to start.

---

## Health checks

Two health endpoints are exposed:

- `GET /health`  
  Confirms the server process is running.

- `GET /health/db`  
  Confirms the server can communicate with the database.

These endpoints are used by Docker to determine container health.

---

## Shutdown behavior

The application handles system signals (`SIGINT`, `SIGTERM`) and performs a graceful shutdown:

1. Stops accepting new HTTP connections
2. Closes the HTTP server
3. Disconnects from the database
4. Exits the process cleanly

This prevents corrupted connections and ensures safe restarts.

---

## Domain: Tasks

Tasks are a simple domain feature used to validate the backend foundation.

- Tasks belong to authenticated users
- Users can only access their own tasks
- The domain exists to demonstrate clean separation from platform code

---

## Running the project (Docker)

```bash
docker compose up --build


## Future Improvements   -- I'll add domain code
