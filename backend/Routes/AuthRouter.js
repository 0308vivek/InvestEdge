const {
  signup,
  login,
  getMe,
  logout,
} = require("../controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../MiddleWares/AuthValidation");
const { ensureAuth } = require("../MiddleWares/ensureAuth");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.get("/me", ensureAuth, getMe);
router.post("/logout", logout);

module.exports = router;
