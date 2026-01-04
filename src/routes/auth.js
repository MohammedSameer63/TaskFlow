const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const prisma = require("../db");

const router = express.Router();

// In-memory user store
const users = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hash },
  });

  res.json({ id: user.id, email: user.email });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
