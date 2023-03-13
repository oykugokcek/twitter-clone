const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "kullanıcıları alabiliriz" });
});

router.delete("/:id", (req, res, next) => {
  res
    .status(200)
    .json({ message: `${req.params.id} li kullanıcıyı silebiliriz` });
});

router.put("/:id", (req, res, next) => {
  res
    .status(200)
    .json({ message: `${req.params.id} li kullanıcıyı değiştirebiliriz` });
});

module.exports = router;
