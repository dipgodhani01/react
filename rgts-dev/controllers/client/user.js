const User = require("../../models/User");
const Otp = require("../../models/Otp");
const { logger, emailToUsername, generateOTP } = require("../../utils");
const bcrypt = require("bcrypt");
const {
  userFindById,
  sendToken,
  getLocation,
} = require("../../services/userService");
const {
  encryptPassword,
} = require("../../middlewares/Encryption/passwordEncryption");
const { sendVarificationEmail } = require("../../utils/sendEmail");

exports.register = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  try {
    const { email, mobile, gender, dialCode } = req.body;
    const secPass = await encryptPassword(req.body.password);
    const checkEmail = await User.find({ email: email });
    const username = emailToUsername(email);

    if (checkEmail.length > 0) {
      return res.status(200).json({
        status: false,
        message: "This email address is already registered.",
        data: {},
      });
    }

    const checkUsername = await User.find({ username: username });
    if (checkUsername.length > 0) {
      return res.status(200).json({
        status: false,
        message: "This username is already taken. Please choose another.",
        data: {},
      });
    }

    const isExist = await User.findOne({ dialCode, mobile });
    if (isExist) {
      return res.status(400).json({
        status: false,
        message:
          "This mobile number is already associated with another account.",
      });
    }

    const locationDetails = await getLocation(ip);

    const doc = await User.create({
      name: req.body.name,
      username: username,
      password: secPass,
      email: email,
      mobile: mobile,
      dialCode: dialCode,
      dob: req.body.dob,
      gender: gender,
      emailVerified: false,
      role: "user",
      city: locationDetails.city,
      state: locationDetails.regionName,
      country: locationDetails.country,
      zipcode: locationDetails.zip,
    });

    const user = await userFindById(doc._id);
    const varificationCode = generateOTP();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    await Otp.deleteMany({ email: email, type: "signup" });
    await Otp.create({
      email: email,
      otp: varificationCode,
      type: "signup",
      expiresAt: expiresAt,
    });

    const userName = user.name;
    sendVarificationEmail(userName, varificationCode, email, res);

    return res.status(200).json({
      status: true,
      message: `Verification code has been sent on ${email}.`,
      data: user,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { otp, type } = req.body;

  try {
    const otpEntry = await Otp.findOne({ otp, type });

    if (!otpEntry) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid OTP", data: {} });
    }

    const now = new Date();
    if (otpEntry.expiresAt < now) {
      await Otp.deleteOne({ _id: otpEntry._id });
      return res
        .status(400)
        .json({ status: false, message: "OTP Expired.", data: {} });
    }

    const email = otpEntry.email;
    const user = await User.findOne({ email });

    if (user) {
      user.emailVerified = true;
    }

    await user.save({ validateModifiedOnly: true });
    await Otp.deleteOne({ _id: otpEntry._id });
    return res.status(200).json({
      status: true,
      message: `Your account is now active. login and continue`,
      data: user,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const dbpassword = user.password;
      const userStatus = user.status;
      if (userStatus == "block") {
        res.json({
          status: false,
          message:
            "Your account had been blocked please contact - support@svoncoms.com",
          data: {},
        });
      } else if (bcrypt.compareSync(password, dbpassword)) {
        await User.findByIdAndUpdate(user._id, { isLogin: true });
        const userDetails = await userFindById(user._id);
        sendToken(userDetails, 200, "login succesfull.", res);
      } else {
        res.json({
          status: false,
          message: "You've entered an incorrect password",
          data: {},
        });
      }
    } else {
      res.json({ status: false, message: "Account does not exist", data: {} });
    }
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.getUserProfile = async (req, res) => {  
  const user = await userFindById(req.user.id);  
  res.status(200).json({
    status: true,
    data: user,
  });
};

exports.logout = async (req, res, next) => {
  try {
    const id = req.user._id;
    await User.findByIdAndUpdate(id, { isLogin: false });
    res
      .status(200)
      .cookie("userToken", "", {
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

exports.updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User does not exist", data: {} });
    }
    const hashPass = await encryptPassword(password);
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: { password: hashPass } }
    );
    res
      .status(200)
      .cookie("userToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        status: true,
        message: "Password Updated.",
        data: updatedUser,
      });
  } catch (err) {
    return res.status(400).json({ status: false, message: err, data: {} });
  }
};
