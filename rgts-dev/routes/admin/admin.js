const router = require("express").Router();
const {
  adminSignIn,
  getAdminProfile,
  logoutAdmin,
  updateAdminPassword,
  getAllUser,
  updateuserStatus,
  getUserById,
} = require("../../controllers/admin/admin");
const { authorizeRoles, protectAdmin } = require("../../middlewares");
const validation = require("../../middlewares/validate");
const { adminSignInSchema } = require("../../validations/userValidation");

// Auth
router.post("/signin", validation(adminSignInSchema), adminSignIn);
router.get(
  "/get_admin",
  protectAdmin,
  authorizeRoles(["admin"]),
  getAdminProfile
);
router.get("/logout", protectAdmin, authorizeRoles(["admin"]), logoutAdmin);
router.put(
  "/change_password",
  protectAdmin,
  authorizeRoles(["admin"]),
  updateAdminPassword
);
router.put(
  "/update_status/:user_id",
  protectAdmin,
  authorizeRoles(["admin"]),
  updateuserStatus
);
router.get(
  "/all_users",
  protectAdmin,
  authorizeRoles(["admin"]),
  getAllUser
);
router.get(
  "/user/:id",
  protectAdmin,
  authorizeRoles(["admin"]),
  getUserById
);

module.exports = router;
