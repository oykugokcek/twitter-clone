const userModel = require("./user-model");

async function validateUserId(req, res, next) {
  try {
    let existUser = await userModel.getUsersBy(req.params.id);
    if (!existUser) {
      res.status(404).json({ message: "NOT FOUND" });
    } else {
      res.user = existUser;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateUserId };
