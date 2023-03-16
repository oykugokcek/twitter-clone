const router = require("express").Router();
const postModel = require("./posts-model");
const md = require("./posts-middleware");
const authMD = require("../auth/auth-middleware");

// router.get("/all", async (req, res, next) => {
//   const allData = await postModel.userPostData();
//   res.json(allData);
// });

router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.getPosts();
    res.status(200).json(posts);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", md.validateUserId, async (req, res, next) => {
  res.status(200).json(res.post);
  next();
});

//json post dönmüyor
router.post("/", async (req, res, next) => {
  console.log(req.userInfo.subject);
  const post = {
    user_id: req.userInfo.subject,
    content: req.body.content,
  };
  console.log(post.content);
  try {
    let insertedPost = await postModel.insert(post);
    console.log(insertedPost);
    res.status(200).json(insertedPost);
    next();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let post = await postModel.updateById(
      { content: req.body.content },
      req.params.id
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await postModel.deleteById(req.params.id);
    res.status(200).json({ message: "Post silindi" });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
