const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "auth router is working" });
});
router.post("/register", (req, res, next) => {
  res.status(200).json({ message: "register working" });
});

router.post("/login", (req, res, next) => {
  res.status(200).json({ message: "login working" });
});

module.exports = router;
