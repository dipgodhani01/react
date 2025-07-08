const {
  secretKey,
  tokenExpiry,
  cookiesExpiry,
  SMTP_HOST,
  SMTP_SERVICE,
  SMTP_PORT,
  SMTP_MAIL,
  SMTP_PASSWORD,
} = require("../config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const axios = require("axios");
const Admin = require("../models/Admin");

const generateToken = async (payload) => {
  return await jwt.sign(payload, secretKey, {
    expiresIn: tokenExpiry,
  });
};


const sendToken = async (user, statusCode, message, res) => {
  const payload = {id:user._id, role:user.role}
  const token = await generateToken(payload);
  const cookieName = user.role === "admin" ? "adminToken" : "userToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + Number(cookiesExpiry) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      status: true,
      user,
      message,
      token,
    });
};

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: SMTP_HOST,
    service: SMTP_SERVICE,
    port: SMTP_PORT,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const options = {
    from: SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };
  await transporter.sendMail(options);
};

const userFindById = async (userID) => {
  try {
    var user = await User.findOne({ _id: userID });
    var data = null;
    if (user !== null) {
      data = {
        _id: user._id,
        gender: user.gender,
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile || "",
        dob: user.dob || "",
        dialCode: user.dialCode,
        isLogin: user.isLogin || false,
        emailVerified: user.emailVerified || false,
        role: user.role || "user",
        createdAt: user.createdAt,
        city: user.city,
        status:user.status,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const adminFindById = async (userID) => {
  try {
    var admin = await Admin.findOne({ _id: userID });
    var data = null;
    if (admin !== null) {
      data = {
        _id: admin._id,
        username: admin.username,
        role: admin.role || "admin",
        isAdminLogin: admin.isAdminLogin,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const userFindByUserName = async (username) => {
  try {
    var user = await User.findOne({ username: username });
    var data = null;
    if (user !== null) {
      data = {
        _id: user._id,
        gender: user.gender,
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile || "",
        dob: user.dob || "",
        dialCode: user.dialCode || "",
        isLogin: user.isLogin || false,
        role: user.role || "user",
        emailVerified: user.emailVerified || false,
        createdAt: user.createdAt,
        status:user.status,
        city: user.city,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (filter) => {
  try {
    var user = await User.findOne(filter);
    var data = null;
    if (user !== null) {
      data = {
        _id: user._id,
        gender: user.gender,
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile || "",
        password: user.password,
        dob: user.dob || "",
        dialCode: user.dialCode || "",
        isLogin: user.isLogin || false,
        emailVerified: user.emailVerified || false,
        role: user.role || "user",
        createdAt: user.createdAt,
        status:user.status,
        city: user.city,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const getAdmin = async (filter) => {
  try {
    var admin = await Admin.findOne(filter);
    var data = null;
    if (admin !== null) {
      data = {
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        isAdminLogin: admin.isAdminLogin,
      };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const getLocation = async (ip) => {
  try {
    // const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    // const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,query`);
    const response = await axios.get(
      `http://ip-api.com/json/103.238.108.239?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,query`
    );
    const locationData = response.data;

    return locationData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  userFindById,
  getUser,
  userFindByUserName,
  generateToken,
  sendToken,
  sendEmail,
  getLocation,
  adminFindById,
  getAdmin,
};
