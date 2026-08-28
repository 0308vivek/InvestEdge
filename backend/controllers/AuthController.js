const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const TOKEN_EXPIRY = "24h";
const COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: COOKIE_MAX_AGE_MS,
  path: "/",
};

const toPublicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

const createToken = (user) =>
  jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY },
  );

const sendAuthSuccess = (res, status, message, user) => {
  const jwtToken = createToken(user);
  res.cookie("token", jwtToken, cookieOptions);
  return res.status(status).json({
    message,
    success: true,
    user: toPublicUser(user),
  });
};

const signup = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return sendAuthSuccess(res, 201, "SignUp successful", user);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const { password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    return sendAuthSuccess(res, 200, "Login successful", user);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user: toPublicUser(user),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  return res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
};

module.exports = { signup, login, getMe, logout };
