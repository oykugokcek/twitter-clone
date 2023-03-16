const userModel = require("../users/users-model");
const { JWT_SECRET } = require("../../config/index");
const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
      if (err) {
        next({ status: 401, message: "Token gecersizdir" });
      } else {
        req.userInfo = decodedJWT;
        next();
      }
    });
  } else {
    next({ status: 401, message: "Token gereklidir" });
  }
};

//GENERATETOKENDA USER_ID GÖNDERİYORUM AMA GERİ ALAMIYORUM
const checkRole = (role) => (req, res, next) => {
  //currying
  console.log(req.userInfo);
  if (req.userInfo && req.userInfo.role_name === role) {
    next();
  } else {
    next({ status: 403, message: "Yetkiniz yok" });
  }
};

const validateName = (req, res, next) => {
  const turkishChar = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(\s[a-zA-ZğüşıöçĞÜŞİÖÇ]+)?$/;
  const fullName = req.body.name;
  if (fullName) {
    const nameParts = fullName.split(" ");
    //hem ad hem soyad var
    if (nameParts.length > 0) {
      for (let i = 0; i < nameParts.length; i++) {
        const namePart = nameParts[i];
        if (!turkishChar.test(namePart)) {
          return next({ status: 400, message: "Geçersiz ad/soyad" });
        } else {
          next();
        }
      }
    }
  } else {
    return next({ status: 400, message: "Ad/soyad eksik" });
  }
};

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  // const passwordInclude = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!password) {
    return next({ status: 400, message: "Şifre eksik" });
  } else {
    if (password.split("").length < 4) {
      return next({
        status: 400,
        message: "Şifre en az 4 karakter uzunluğunda olmalıdır",
      });
    } else {
      next();
    }
  }
};

const deneme = (req, res, next) => {
  console.log("buradyaım.");
  next();
};

const validateUsernameUnique = async (req, res, next) => {
  try {
    let existUser = await userModel.getUsersBy({ username: req.body.username });
    if (existUser) {
      next({ status: 401, message: "Başka bir kullanıcı adı giriniz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateEmail = async (req, res, next) => {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standart email regex'i
  if (!emailRegex.test(email)) {
    next({ status: 400, message: "Lütfen geçerli bir email adresi girin." });
  }
  next();
};

const validateRole = async (req, res, next) => {
  const { role_id } = req.body;
  if (!role_id) {
    req.body.role_id = 3;
    next();
  } else {
    if (role_name.trim() === "admin") {
      next({ status: 422, message: "Rol adı admin olamaz" });
    } else if (role_name.trim().length > 32) {
      next({ status: 422, message: "32 karakterden fazla" });
    } else {
      req.body.role_name = role_name.trim();
      next();
    }
  }
};

const validateUsernameExistence = async (req, res, next) => {
  try {
    let existUser = await userModel.getUsersBy({ username: req.body.username });
    if (existUser) {
      next();
    } else {
      next({ status: 401, message: "Kullanıcı bilgileri yanlış!!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  restricted,
  checkRole,
  validateUsernameExistence,
  validateEmail,
  validateName,
  validatePassword,
  validateUsernameUnique,
  validateRole,
  deneme,
};
