const router = require("express").Router();
const postModel = require("./posts-model");
const md = require("./posts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.getPosts();
    res.status(200).json(posts);
  } catch (error) {}
});

router.get("/:id", md.validateUserId, (req, res, next) => {
  res.status(200).json(res.locals.post);
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
