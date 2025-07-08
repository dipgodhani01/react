const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
const Admin = require("../models/Admin");
const User = require("../models/User");

// Middleware
exports.protectAdmin = async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied for non-admins" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    req.user = admin;    
    next();    
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.protectUser = async (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied for non-users" });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();    
  };
};
