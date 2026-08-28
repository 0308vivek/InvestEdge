const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
  const token = bearerToken || req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: token missing",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: invalid or expired token",
      success: false,
    });
  }
};

module.exports = { ensureAuth };
