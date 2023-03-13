const postModel = require("./posts-model");

async function validateUserId(req, res, next) {
  try {
    let existPost = await postModel.getPostsByUserId(req.params.id);
    if (!existPost) {
      res.status(404).json({ message: "NOT FOUND" });
    } else {
      res.locals.post = existPost;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu, AYRICA BURAYI DÜZELT" });
  }
}

module.exports = {
  validateUserId,
};
