const express = require("express");
const logger = require("./logger");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks",taskRoutes);

app.use((req, res, next) => {
  logger.info("Request received", {
    method: req.method,
    path: req.path,
  });
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error("Unhandled error", { error: err.message });
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
