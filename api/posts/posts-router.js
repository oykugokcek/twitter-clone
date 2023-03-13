const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "list of my posts working" });
});

router.get("/:id", (req, res, next) => {
  res.status(200).json({ message: `${req.params.id} post geliyor` });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "new post post working" });
});

router.put("/:id", (req, res, next) => {
  res.status(200).json({ message: `${req.params.id} post update working` });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({ message: `${req.params.id} post delete working` });
});

module.exports = router;
