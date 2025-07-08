const router = require("express").Router();
const {
  signIn,
  register,
  getUserProfile,
  logout,
  verifyOTP,
  updateUserPassword,
} = require("../../controllers/client/user");
const {authorizeRoles, protectUser } = require("../../middlewares");
const validation = require("../../middlewares/validate");
const {
  userSchema,
  signInSchema,
} = require("../../validations/userValidation");

// Auth
router.post("/register", validation(userSchema), register);
router.post("/signin", validation(signInSchema), signIn);
router.post("/verify_otp", verifyOTP);
router.get(
  "/get_profile",
  protectUser,
  authorizeRoles(["user"]),
  getUserProfile
);
router.get("/logout", protectUser, authorizeRoles(["user"]), logout);
router.put("/update_password", protectUser, authorizeRoles(["user"]), updateUserPassword);

module.exports = router;
