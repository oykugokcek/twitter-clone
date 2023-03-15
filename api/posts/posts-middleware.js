const postModel = require("./posts-model");

async function validateUserId(req, res, next) {
  try {
    let existPost = await postModel.getPostsByUserId(req.params.id);
    if (!existPost) {
      res.status(404).json({ message: "NOT FOUND" });
    } else {
      res.post = existPost;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateUserId,
};
