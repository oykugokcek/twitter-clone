const router = require("express").Router();
const authMW = require("../auth/auth-middleware");
const userModel = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "auth router is working" });
});

//EKLİYOR AMA GERİ DÖNMÜYOR
router.post(
  "/register",
  authMW.validateUsernameUnique,
  authMW.validatePassword,
  authMW.validateName,
  authMW.validateEmail,
  authMW.validateRole,
  async (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    try {
      let insertedUser = await userModel.addUser(user);

      res.status(201).json(insertedUser);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  authMW.validateUsernameExistence,

  async (req, res, next) => {
    //get user from the db
    try {
      let { username, password } = req.body;
      const user = await userModel.getUsersBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generatetoken(user);
        res.json({ message: `Hoşgeldin ${user.username}`, token });
        next();
      } else {
        next({ status: 401, message: "Kullanıcı bilgileri yanlış." });
      }
    } catch (error) {
      next(error);
    }
  }
);

function generatetoken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_id: user.role_id,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = router;
