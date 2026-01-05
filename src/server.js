require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}
const app = require("./app");
const logger = require("./logger");

const PORT = 3000;

const server = app.listen(PORT, () => {
  logger.info("API started", { port: PORT });
});

const prisma = require("./db");

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  logger.info(`${signal} received. Shutting down gracefully...`);

server.close(async () => {
  logger.info("HTTP server closed");

  try {
    await prisma.$disconnect();
    logger.info("Prisma disconnected");
  } catch (err) {
    logger.error("Error disconnecting Prisma", err);
  } finally {
    process.exit(0);
  }
});
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
