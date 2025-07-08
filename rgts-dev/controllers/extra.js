const { secretKey } = require("../../config");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const crypto = require("crypto");
const { logger, getRandomString } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/sendEmail");
const {
  updateUserJWT,
  userFindById,
  userFindByUserName,
  getUser,
  generateToken,
  sendToken,
} = require("../../services/userService");
const { SUCCESS, CLIENT_ERROR } = require("../../config/responseCodes");
const { sendOtpSMS } = require("../../utils/sendMessage");
const {
  encryptPassword,
} = require("../../middlewares/Encryption/passwordEncryption");
const { log } = require("console");

exports.adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({
      email,
    });

    if (user) {
      const dbpassword = user.password;
      if (bcrypt.compareSync(password, dbpassword)) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
          },
          secretKey
        );
        await updateUserJWT({ jwtToken: token }, user._id);
        delete user.password;
        res.json({
          status: true,
          message: "Login successfully",
          token: token,
          data: user,
        });
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
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};



// exports.update = async (req, res) => {
//   //try {
//   const { name, username, email, mobile, dob, gender, dialCode, id, bio } =
//     req.body;

//   if (/\s/.test(username)) {
//     return res
//       .status(200)
//       .json({
//         status: false,
//         message: "Username should not allowed with space.",
//         data: {},
//       });
//   }

//   const user = await User.findOne({ _id: id });
//   if (user) {
//     const checkEmail = await User.find({ _id: { $ne: id }, email: email });

//     if (checkEmail.length > 0) {
//       return res
//         .status(200)
//         .json({ status: false, message: "Email is already used.", data: {} });
//     }

//     const checkUsername = await User.find({
//       _id: { $ne: id },
//       username: username,
//     });
//     if (checkUsername.length > 0) {
//       return res
//         .status(200)
//         .json({
//           status: false,
//           message: "Username is already used.",
//           data: {},
//         });
//     }

//     const filter = { _id: id };
//     const update = {
//       $set: {
//         name: name,
//         username: username,
//         email: email,
//         mobile: mobile,
//         gender: gender,
//         dialCode: dialCode,
//         dob: dob,
//         bio: bio,
//       },
//     };
//     let doc = await User.updateOne(filter, update);
//     res.json({
//       status: true,
//       message: "User has been updated successfully.",
//       data: {},
//     });
//   } else {
//     res.json({
//       status: false,
//       message: "Oops! something went wrong",
//       data: {},
//     });
//   }
// } catch (err) {
//   return res.status(400).json({status:false,message:err.name,data:{}})
// }
// };

// exports.updateOnlineStatus = async (req, res) => {
//   try {
//     const { online, id } = req.body;
//     const user = await User.findOne({ _id: id });
//     if (user) {
//       const filter = { _id: id };
//       const update = { $set: { online: online } };
//       let doc = await User.updateOne(filter, update);
//       res.json({
//         status: true,
//         message: "User has been updated successfully.",
//         data: {},
//       });
//     } else {
//       res.json({
//         status: false,
//         message: "Oops! something went wrong",
//         data: {},
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };

// exports.saveUserCategory = async (req, res) => {
//   try {
//     const { category, id } = req.body;
//     const user = await User.findOne({ _id: id });
//     if (user) {
//       if (Array.isArray(category)) {
//         const filter = { _id: id };
//         const update = { $set: { category: category } };
//         c(id);
//         let doc = await User.updateOne(filter, update);
//         res.json({
//           status: true,
//           message: "User's category has been updated successfully.",
//           data: {},
//         });
//       } else {
//         res.json({
//           status: false,
//           message: "Category params should array.",
//           data: {},
//         });
//       }
//     } else {
//       res.json({
//         status: false,
//         message: "Oops! something went wrong",
//         data: {},
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err, data: {} });
//   }
// };

// exports.updateProfileImage = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (typeof req.file == "undefined") {
//       res.json({ status: false, message: "Please select Image", data: {} });
//     } else {
//       if (image_types.indexOf(req.file.mimetype) == -1) {
//         res.json({
//           status: false,
//           message: "Supported image formats: jpeg, jpg, jpe, png",
//           data: {},
//         });
//       } else {
//         const user = await User.findOne({ email: email });
//         if (user) {
//           const img = await uploadToS3(req.file.buffer);
//           const imageUrl = img.Location;
//           if (imageUrl) {
//             const filter = { email: email };
//             const update = { $set: { image: imageUrl } };
//             let doc = await User.updateOne(filter, update);

//             if (user.image) {
//               var imageArray = user.image.split("/");
//               let imageName = imageArray.pop();
//               S3.deleteObject(
//                 {
//                   Bucket: bucketName,
//                   Key: imageName,
//                 },
//                 function (err, data) {}
//               );
//             }
//             res.json({
//               status: true,
//               message: "User has been updated successfully.",
//               data: {
//                 image: imageUrl,
//               },
//             });
//           } else {
//             res.json({
//               status: false,
//               message: "Oops! something went wrong",
//               data: {},
//             });
//           }
//         } else {
//           res.json({
//             status: false,
//             message: "Oops! something went wrong",
//             data: {},
//           });
//         }
//       }
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json(err);
//   }
// };

// exports.getAllUser = async (req, res) => {
//   try {
//     const skip = req.body.page - 1 || 0;
//     const limit = req.body.limit || 10;
//     const userType = req.user.userType;
//     if (userType == "Administrator") {
//       const type = req.body.userType;
//       var data = [];
//       var users = await User.find({ userType: type })
//         .populate({ path: "category", select: "name image" })
//         .sort({ _id: -1 });
//       if (users !== null) {
//         users = JSON.parse(JSON.stringify(users));
//         var index = 0;
//         for (const user of users) {
//           const countryData = await Country.findOne(
//             { _id: user.country },
//             "countryName countryCode currencyCode phoneCode"
//           );
//           const languageData = await Language.find(
//             { _id: user.language_speak_fluently },
//             "languageName languageCode"
//           );

//           data[index] = {
//             _id: user._id,
//             image: user.image,
//             gender: user.gender,
//             userType: user.userType,
//             name: user.name,
//             username: user.username,
//             email: user.email,
//             mobile: user.mobile,
//             dob: user.dob,
//             dialCode: user.dialCode || "",
//             category: user.category || [],
//             bio: user.bio || "",
//             minutes: [10, 20, 30, 60],
//             uploadImages: user.uploadImages || [],
//             uploadVideos: user.uploadVideos || [],
//             video: user.video || "",
//             videoDenyReason: user.videoDenyReason || "",
//             videoApproved: user.videoApproved || "Pending",
//             country: countryData || {},
//             language_speak_fluently: languageData,
//             calls_amount: user.calls_amount || {},
//             status: user.status,
//             isDeleted: user.isDeleted,
//             inhouse_listener: user.inhouse_listener || false,
//             createdAt: user.createdAt,
//           };
//           index++;
//         }
//       }

//       res.json({ status: true, message: type, data: users });
//     } else {
//       await User.aggregate([
//         {
//           $group: {
//             _id: "$_id",
//             followersCount: { $sum: { $size: "$followers" } },
//             followingCount: { $sum: { $size: "$following" } },
//             name: { $first: "$name" },
//             username: { $first: "$username" },
//             email: { $first: "$email" },
//             mobile: { $first: "$mobile" },
//             dob: { $first: "$dob" },
//             dialCode: { $first: "$dialCode" },
//           },
//         },
//         {
//           $skip: skip,
//         },
//         {
//           $limit: limit,
//         },
//       ]).exec(function (err, users) {
//         res.json({
//           status: true,
//           message: "Record has been fetched successfully.",
//           data: users,
//         });
//       });
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };

// exports.getUserProfile = async (req, res) => {
//   try {
//     const userID = req.user.id;
//     const user = await userFindById(userID);
//     if (user) {
//       res.json({
//         status: true,
//         message: "Record fetched successfully",
//         data: user,
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ status: false, message: "Something went to wrong", data: {} });
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };

// // User and Listner delete
// exports.deleteAcount = async (req, res) => {
//   try {
//     const { id } = req.body;

//     const userType = req.user.userType;
//     if (userType == "Administrator") {
//       const { userId } = req.body;
//       if (userId) {
//         const user = await User.findOne({ _id: userId });
//         if (user) {
//           const filter = { _id: userId };
//           const update = { $set: { isDeleted: true } };
//           let doc = await User.updateOne(filter, update);
//           res.json({
//             status: true,
//             message: "Account terminated successfully.",
//             data: {},
//           });
//         } else {
//           res.json({
//             status: false,
//             message: "Oops! something went wrong",
//             data: {},
//           });
//         }
//       } else {
//         res.json({
//           status: false,
//           message: "User Id field is required.",
//           data: {},
//         });
//       }
//     } else {
//       const user = await User.findOne({ _id: id });
//       if (user) {
//         const filter = { _id: id };
//         const update = { $set: { isDeleted: true } };
//         let doc = await User.updateOne(filter, update);
//         res.json({
//           status: true,
//           message: "Account terminated successfully.",
//           data: {},
//         });
//       } else {
//         res.json({
//           status: false,
//           message: "Oops! something went wrong",
//           data: {},
//         });
//       }
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };

// // Upload images of user and listner for reviue
// exports.uploadImage = async (req, res) => {
//   try {
//     const id = req.user.id;

//     if (typeof req.file == "undefined") {
//       res.json({ status: false, message: "Please select Image", data: {} });
//     } else {
//       if (image_types.indexOf(req.file.mimetype) == -1) {
//         res.json({
//           status: false,
//           message: "Supported image formats: jpeg, jpg, jpe, png",
//           data: {},
//         });
//       } else {
//         const user = await User.findOne({ _id: id });
//         if (user) {
//           const imageSave = `image_` + `${Date.now().toString()}.png`;
//           const img = await uploadToS3(
//             req.file.buffer,
//             bucketName + "/uploads",
//             imageSave
//           );
//           const imageUrl = img.Location;
//           if (imageUrl) {
//             const filter = { _id: id };
//             const update = {
//               $push: { uploadImages: { image: imageUrl, thumbnail: "" } },
//             };
//             //c(update);
//             let doc = await User.updateOne(filter, update);
//             res.json({
//               status: true,
//               message: "Image has been uploaded successfully.",
//               data: {
//                 image: imageUrl,
//                 thumbnail: "",
//               },
//             });
//           } else {
//             res.json({
//               status: false,
//               message: "Oops! something went wrong",
//               data: {},
//             });
//           }
//         } else {
//           res.json({
//             status: false,
//             message: "Oops! something went wrong",
//             data: {},
//           });
//         }
//       }
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json(err);
//   }
// };

// // Upload images of user and listner for reviue
// exports.uploadVideo = async (req, res) => {
//   try {
//     const id = req.user.id;
//     if (typeof req.files.video == "undefined") {
//       res.json({ status: false, message: "Please upload video", data: {} });
//     } else if (typeof req.files.thumbnail == "undefined") {
//       res.json({ status: false, message: "Please upload thumbnail", data: {} });
//     } else {
//       if (allow_video_types.indexOf(req.files.video[0].mimetype) == -1) {
//         res.json({
//           status: false,
//           message: "Supported image formats: 'MP4', 'MOV','WMV','AVI','AVCHD'",
//           data: {},
//         });
//       } else if (image_types.indexOf(req.files.thumbnail[0].mimetype) == -1) {
//         res.json({
//           status: false,
//           message: "Supported image formats: jpeg, jpg, jpe, png",
//           data: {},
//         });
//       } else {
//         const user = await User.findOne({ _id: id });
//         if (user) {
//           const videoFile =
//             `video_` +
//             `${Date.now().toString()}.` +
//             req.files.video[0].originalname.split(".").pop();
//           const img = await uploadToS3(
//             req.files.video[0].buffer,
//             bucketName + "/videos",
//             videoFile
//           );
//           const videoUrl = img.Location;

//           const thumbnailFile =
//             `thumbnail_` +
//             `${Date.now().toString()}.` +
//             req.files.thumbnail[0].originalname.split(".").pop();
//           const thumbnailS3R = await uploadToS3(
//             req.files.thumbnail[0].buffer,
//             bucketName + "/videos",
//             thumbnailFile
//           );
//           const thumbnailUrl = thumbnailS3R.Location;

//           if (videoUrl || thumbnailUrl) {
//             const filter = { _id: id };
//             const update = {
//               $push: {
//                 uploadVideos: { thumbnail: thumbnailUrl, video: videoUrl },
//               },
//             };
//             let doc = await User.updateOne(filter, update);
//             res.json({
//               status: true,
//               message: "Video has been uploaded successfully.",
//               data: {
//                 video: videoUrl,
//                 thumbnail: thumbnailUrl,
//               },
//             });
//           } else {
//             res.json({
//               status: false,
//               message: "Oops! something went wrong",
//               data: {},
//             });
//           }
//         } else {
//           res.json({
//             status: false,
//             message: "Oops! something went wrong",
//             data: {},
//           });
//         }
//       }
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json(err);
//   }
// };

// // Upload images of user and listner for reviue
// exports.deleteVideo = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const url = req.body.url;
//     if (url) {
//       const user = await User.findOne({ _id: id });
//       if (user) {
//         const filter = { _id: id };
//         const update = { $pull: { uploadVideos: { video: url } } };
//         let doc = await User.updateOne(filter, update);
//         S3.deleteObject(
//           {
//             Bucket: bucketName + "/videos",
//             Key: url,
//           },
//           function (err, data) {}
//         );
//         res.json({
//           status: true,
//           message: "Video deleted successfully",
//           data: {},
//         });
//       } else {
//         res.json({
//           status: false,
//           message: "Oops! something went wrong",
//           data: {},
//         });
//       }
//     } else {
//       res.json({ status: false, message: "Video url is required", data: {} });
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json(err);
//   }
// };

// Upload images of user and listner for reviue
// exports.deleteImage = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const url = req.body.url;
//     if (url) {
//       const user = await User.findOne({ _id: id });
//       if (user) {
//         const filter = { _id: id };

//         const update = { $pull: { uploadImages: { image: url } } };
//         let doc = await User.updateOne(filter, update);
//         S3.deleteObject(
//           {
//             Bucket: bucketName + "/uploads",
//             Key: url,
//           },
//           function (err, data) {}
//         );
//         res.json({
//           status: true,
//           message: "Image deleted successfully",
//           data: {},
//         });
//       } else {
//         res.json({
//           status: false,
//           message: "Oops! something went wrong",
//           data: {},
//         });
//       }
//     } else {
//       res.json({ status: false, message: "Image url is required", data: {} });
//     }
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// };

// exports.bioVideo = async (req, res) => {
//   try {
//     const id = req.user.id;
//     if (typeof req.file == "undefined") {
//       res.json({ status: false, message: "Please upload video", data: {} });
//     } else {
//       if (allow_video_types.indexOf(req.file.mimetype) == -1) {
//         res.json({
//           status: false,
//           message: "Supported image formats: mp4, 3gp, flv, hdv,quicktime,mpeg",
//           data: {},
//         });
//       } else {
//         const user = await User.findOne({ _id: id });
//         if (user) {
//           const videoFile = `bio_` + `${Date.now().toString()}.` + "mp4";
//           const img = await uploadToS3(req.file.buffer, "", videoFile);
//           const imageUrl = img.Location;
//           if (imageUrl) {
//             const filter = { _id: id };
//             const update = {
//               $set: { video: imageUrl, videoApproved: "UnderReview" },
//             };
//             let doc = await User.updateOne(filter, update);

//             if (user.video) {
//               var imageArray = user.video.split("/");
//               let imageName = imageArray.pop();
//               S3.deleteObject(
//                 {
//                   Bucket: bucketName,
//                   Key: imageName,
//                 },
//                 function (err, data) {}
//               );
//             }
//             res.json({
//               status: true,
//               message: "video has been uploaded successfully.",
//               data: {
//                 video: imageUrl,
//               },
//             });
//           } else {
//             res.json({
//               status: false,
//               message: "Oops! something went wrong",
//               data: {},
//             });
//           }
//         } else {
//           res.json({ status: false, message: "User Not found", data: {} });
//         }
//       }
//     }
//   } catch (err) {
//     logger.error(err);
//     return res.status(400).json(err);
//   }
// };

// exports.getUserDetailById = async (req, res) => {
//   //try {
//   const userID = req.body.userID;
//   const username = req.body.username;
//   if (userID || username) {
//     if (userID) {
//       var user = await userFindById(userID);
//     } else {
//       var user = await userFindByUserName(username);
//     }

//     if (user) {
//       res
//         .status(SUCCESS)
//         .json({
//           status: true,
//           message: "Record fetched successfully",
//           data: user,
//         });
//     } else {
//       return res
//         .status(CLIENT_ERROR)
//         .json({ status: false, message: "Something went to wrong", data: {} });
//     }
//   } else {
//     return res
//       .status(CLIENT_ERROR)
//       .json({ status: false, message: "User id field is required.", data: {} });
//   }

//   // } catch (err) {
//   //   logger.error(err)
//   //   return res.status(CLIENT_ERROR).json({status:false,message:err.name,data:{}})
//   // }
// };

// exports.updateUserStatus = async (req, res) => {
//   try {
//     const { status, userId } = req.body;
//     const user = await User.findOne({ _id: userId });
//     if (user) {
//       const filter = { _id: userId };
//       const update = { $set: { status: status } };
//       let doc = await User.updateOne(filter, update);
//       res.json({
//         status: true,
//         message: "User status has been updated successfully.",
//         data: {},
//       });
//     } else {
//       res.json({
//         status: false,
//         message: "Oops! something went wrong",
//         data: {},
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     var user = await User.findOne({ email: email });

//     if (!user) {
//       return res
//         .status(200)
//         .json({ status: false, message: "User not found.", data: {} });
//     }

//     if (user.emailVerified) {
//       return res
//         .status(200)
//         .json({ status: true, message: "Email already verified.", data: {} });
//     }

//     if (user.otp !== otp) {
//       return res
//         .status(200)
//         .json({ status: false, message: "Invalid OTP.", data: {} });
//     }

//     if (Date.now() > user.otpExpiry) {
//       return res
//         .status(200)
//         .json({ status: false, message: "OTP has expired.", data: {} });
//     }
//     const userId = user.id;
//     user.emailVerified = true;
//     user.otp = null; // Clear OTP
//     user.otpExpiry = null; // Clear OTP expiry
//     await user.save();

//     user = await userFindById(userId);
//     const token = jwt.sign(
//       {
//         id: userId,
//         name: user.name,
//         email: user.email,
//         userType: user.userType,
//       },
//       secretKey
//     );
//     await updateUserJWT({ jwtToken: token }, userId);

//     return res
//       .status(200)
//       .json({
//         status: true,
//         message: "Email verified successfully.",
//         token: token,
//         data: user,
//       });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ status: false, message: err.message, data: {} });
//   }
// };

// exports.resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(200)
//         .json({ status: false, message: "User not found.", data: {} });
//     }

//     if (user.emailVerified) {
//       return res
//         .status(200)
//         .json({ status: true, message: "Email already verified.", data: {} });
//     }

//     // Generate new OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();
//     const html =
//       '<!doctype html><html lang="en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" />' +
//       "<title>Verify Your Email</title>" +
//       '<meta name="description" content="Reset Password Email Template.">' +
//       '<style type="text/css">a:hover {text-decoration: underline !important;}</style>' +
//       "</head>" +
//       '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">' +
//       "<p>Hi " +
//       user.name +
//       " ,</p>" +
//       "<p>Your OTP for email verification is: <strong>" +
//       otp +
//       "</strong>.</p>";
//     "<p>This OTP is valid for 10 minutes.</p>" + "</body></html>";
//     sendEmail(email, "Resend OTP for Email Verification", html);
//     const message = "Your OTP for email verification is: " + otp;
//     sendOtpSMS(user?.dialCode + user?.mobile, message)
//       .then((response) => {})
//       .catch((error) => {});

//     return res
//       .status(200)
//       .json({
//         status: true,
//         message: "OTP has been resent to your email or phone.",
//         data: {},
//       });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ status: false, message: err.message, data: {} });
//   }
// };

// exports.blockUser = async (req, res) => {
//   try {
//     const userId = req.user._id; // Logged-in user
//     const { blockedUserId, id } = req.body; // User to be blocked
//     if (id.toString() === blockedUserId) {
//       return res
//         .status(CLIENT_ERROR)
//         .json({
//           status: false,
//           message: "You cannot block yourself",
//           data: {},
//         });
//     }

//     const user = await User.findByIdAndUpdate(
//       id,
//       { $push: { blocked: blockedUserId } }, // Prevent duplicate entries
//       { new: true }
//     );
//     return res
//       .status(SUCCESS)
//       .json({ status: true, message: "User blocked successfully", data: {} });
//   } catch (err) {
//     logger.error(err);
//     return res
//       .status(CLIENT_ERROR)
//       .json({ status: false, message: err.message, data: {} });
//   }
// };

// exports.unBlockUser = async (req, res) => {
//   try {
//     const { blockedUserId, id } = req.body; // User to be blocked
//     if (id.toString() === blockedUserId) {
//       return res
//         .status(CLIENT_ERROR)
//         .json({
//           status: false,
//           message: "You cannot unblock yourself",
//           data: {},
//         });
//     }

//     const user = await User.findByIdAndUpdate(
//       id,
//       { $pull: { blocked: blockedUserId } }, // Prevent duplicate entries
//       { new: true }
//     );
//     return res
//       .status(SUCCESS)
//       .json({ status: true, message: "User unblocked successfully", data: {} });
//   } catch (err) {
//     logger.error(err);
//     return res
//       .status(CLIENT_ERROR)
//       .json({ status: false, message: err.message, data: {} });
//   }
// };

// exports.getBlockedUsers = async (req, res) => {
//   try {
//     const { id } = req.body; // The ID of the user requesting the blocked list

//     if (!id) {
//       return res
//         .status(CLIENT_ERROR)
//         .json({ status: false, message: "User ID is required", data: {} });
//     }

//     // Fetch user and populate blocked users
//     const user = await User.findById(id).populate(
//       "blocked",
//       "username email image gender userType name mobile"
//     ); // Adjust fields as needed

//     if (!user) {
//       return res
//         .status(CLIENT_ERROR)
//         .json({ status: false, message: "User not found", data: {} });
//     }

//     return res.status(SUCCESS).json({
//       status: true,
//       message: "Blocked users retrieved successfully",
//       data: user.blocked, // List of blocked users
//     });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(CLIENT_ERROR)
//       .json({ status: false, message: err.message, data: {} });
//   }
// };
// // User and Listner delete
// exports.deleteAccountPermanently = async (userId) => {
//   try {
//     if (userId) {
//       // Delete user-related records
//       await Promise.all([
//         Order.deleteMany({ user: userId }),
//         Payment.deleteMany({ user: userId }),
//         WatchHistory.deleteMany({ user: userId }),
//         Notification.deleteMany({ user: userId }),
//         // Add more collections as needed
//       ]);
//       await User.findByIdAndDelete(userId);
//     } else {
//       res.json({
//         status: false,
//         message: "User Id field is required.",
//         data: {},
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({ status: false, message: err.name, data: {} });
//   }
// };
