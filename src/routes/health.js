const router = require("express").Router();
const prisma = require("../db");

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: "ok" });
  } catch (err) {
    res.status(500).json({ db: "down" });
  }
});

module.exports = router;
