const router = require("express").Router();
const userModel = require("./users-model");
const mw = require("./users-middleware");

router.get("/", async (req, res, next) => {
  const users = await userModel.getUsers();
  res.status(200).json(users);
});

router.delete("/:id", mw.validateUserId, async (req, res, next) => {
  try {
    await userModel.remove(req.params.id);
    res.status(200).json({ message: "users deleted" });
  } catch (error) {
    next(error);
  }
});

//user dönmüyor
router.put("/:id", mw.validateUserId, async (req, res, next) => {
  // let changedUser =
  try {
    console.log(typeof req.params.id);
    let user = await userModel.updateById(
      { username: req.body.username },
      req.params.id
    );
    // let user = await userModel.getUsersById(req.params.id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
