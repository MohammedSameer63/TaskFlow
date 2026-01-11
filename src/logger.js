function log(level, message, meta = {}) {
  const entry = {
    time: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  console.log(JSON.stringify(entry));
}

module.exports = {
  info: (msg, meta) => log("INFO", msg, meta),
  error: (msg, err) =>
  log("ERROR", msg, {
    error: err?.message,
    stack: err?.stack,
  }),
};
