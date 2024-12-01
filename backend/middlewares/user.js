const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleWare(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(400).json({
      message: "No token provided",
    });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Failed to authenticate token",
    });
  }
}

module.exports = userMiddleWare;
