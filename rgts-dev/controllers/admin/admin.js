const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const { adminFindById, sendToken, userFindById } = require("../../services/userService");
const {
  encryptPassword,
} = require("../../middlewares/Encryption/passwordEncryption");
const User = require("../../models/User");

exports.adminSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({
      username,
    });

    if (adminUser) {
      const dbpassword = adminUser.password;
      if (bcrypt.compareSync(password, dbpassword)) {
        await Admin.findByIdAndUpdate(adminUser._id, { isAdminLogin: true });
        const adminDetails = await adminFindById(adminUser._id);
        sendToken(adminDetails, 200, "login succesfull.", res);
      } else {
        res.json({
          status: false,
          message: "You've entered an incorrect password",
          data: {},
        });
      }
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.getAdminProfile = async (req, res) => {
  const user = await adminFindById(req.user.id);
  res.status(200).json({
    status: true,
    data: user,
  });
};

exports.logoutAdmin = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Admin.findByIdAndUpdate(id, { isAdminLogin: false });

    res
      .status(200)
      .cookie("adminToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        status: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong during logout.",
    });
  }
};

exports.updateAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.user.id;
    const admin = await Admin.findOne({ _id: id });
    if (!admin) {
      return res
        .status(404)
        .json({ status: false, message: "Admin does not exist", data: {} });
    }
    const hashPass = await encryptPassword(password);
    const adminUser = await Admin.updateOne(
      { _id: id },
      { $set: { password: hashPass } }
    );
    res
      .status(200)
      .cookie("adminToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        status: true,
        message: "Password Updated.",
        data: adminUser,
      });
  } catch (err) {
    return res.status(400).json({ status: false, message: err, data: {} });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userType = req.user.role;

    if (userType == "admin") {
      var users = await User.find({ role: "user" }).sort({ _id: -1 });
      res.json({ status: true, data: users });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.name, data: {} });
  }
};

exports.updateuserStatus = async (req, res) => {
  try {
    const { user_id } = req.params;

    const userType = req.user.role;
    if (userType == "admin") {
      const user = await User.findById(user_id);
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      if (user.status === "active") {
        user.status = "block";
        user.isLogin = false;
        await user.save();
        res.clearCookie("userToken", {
          expires: new Date(Date.now()),
          httpOnly: true,
        });

        return res.json({
          status: true,
          message: "User blocked!",
          data: user,
        });
      } else {
        user.status = "active";
        await user.save();

        return res.json({
          status: true,
          message: "User unblocked",
          data: user,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.name, data: {} });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userType = req.user.role;
    if (userType == "admin") {
      const user = await userFindById(id);
      res.status(200).json({
        status: true,
        data: user,
      });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.name, data: {} });
  }
};
