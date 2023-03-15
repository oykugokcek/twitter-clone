const router = require("express").Router();
const postModel = require("./posts-model");
const md = require("./posts-middleware");
const authMD = require("../auth/auth-middleware");

router.get("/all", async (req, res, next) => {
  const allData = await postModel.userPostData();
  res.json(allData);
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", md.validateUserId, async (req, res, next) => {
  res.status(200).json(res.post);
});

router.post("/", authMD.restricted, async (req, res, next) => {
  try {
    console.log(req.headers.user_id);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  res.status(200).json({ message: `${req.params.id} post update working` });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({ message: `${req.params.id} post delete working` });
});

module.exports = router;
