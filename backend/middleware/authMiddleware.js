const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided",
    });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = verified.id;

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;