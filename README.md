# Taskflow

Taskflow is a minimal backend service built to practice **correct backend engineering fundamentals**, not feature-heavy application logic.

The goal of this project is to understand how a backend **starts, runs, fails, recovers, and shuts down** in a predictable and explainable way.

This repository intentionally keeps features simple and focuses on lifecycle discipline and operational clarity.

---

## Why this project exists

Many backend projects focus on adding features quickly.
Taskflow focuses on **operating a backend correctly**.

This project was built to practice and demonstrate:

- Safe startup and graceful shutdown
- Environment validation and fail-fast behavior
- Database lifecycle management
- Health checks and observability
- Containerized execution
- Clear separation between platform and domain code

The emphasis is on *explainability*, not complexity.

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

This layer defines **how the system runs**, independent of business logic.

Responsibilities include:
- Application startup and shutdown
- Environment validation
- Database connection lifecycle
- Logging
- Health checks
- Docker and Compose configuration

These components rarely change and can be reused across different backend projects.

---

### Domain layer (replaceable)

This layer defines **what the application does**.

Responsibilities include:
- Authentication
- Domain models (e.g. Tasks)
- Business rules
- API routes

This layer is expected to evolve or be replaced when building different applications on top of the same platform foundation.

---

## Startup behavior

On startup, the application performs the following steps:

1. Loads environment variables
2. Validates required configuration (e.g. `JWT_SECRET`)
3. Starts the HTTP server
4. Initializes the database client

If required configuration is missing, the application **fails fast** and refuses to start.
This prevents undefined runtime behavior in production environments.

---

## Health checks

Two health endpoints are exposed:

- `GET /health`  
  Confirms that the server process is running and responding.

- `GET /health/db`  
  Confirms that the server can communicate with the database.

These endpoints are used by Docker and orchestration tools to determine container health and readiness.

---

## Shutdown behavior

The application handles system signals (`SIGINT`, `SIGTERM`) and performs a graceful shutdown:

1. Stops accepting new HTTP connections
2. Closes the HTTP server
3. Disconnects from the database
4. Exits the process cleanly

This ensures safe restarts and prevents corrupted connections or resource leaks.

---

## Domain: Tasks

Tasks are a simple domain feature used to validate the backend foundation.

- Tasks belong to authenticated users
- Users can only access their own tasks
- The domain exists primarily to demonstrate clean separation from platform code

The simplicity of the domain is intentional.

---

## Running the project (Docker)

```bash
docker compose up --build

This change is for pull request practice.
