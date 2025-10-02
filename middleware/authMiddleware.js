import jwt from "jsonwebtoken";

// ✅ Token verification middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// ✅ User access middleware
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (["user", "admin"].includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "User access denied." });
    }
  });
};

// ✅ Admin-only access middleware
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin access denied." });
    }
  });
};