import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey123");
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired.",
    });
  }
};
