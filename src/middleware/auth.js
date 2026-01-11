const jwt = require("jsonwebtoken");
const logger = require("../logger");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    logger.error("JWT verification failed", { error: err.message });
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
