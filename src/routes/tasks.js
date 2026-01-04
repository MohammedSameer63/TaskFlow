const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

module.exports = router;
