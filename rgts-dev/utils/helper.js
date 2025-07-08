const { SUCCESS, CLIENT_ERROR } = require("../config/responseCodes");

// Success Response Handler
const handleSuccess = (res, data, message = "Success") => {
  return res.status(SUCCESS).json({
    status: true,
    message,
    data,
  });
};

// Error Response Handler
const handleError = (res, error, message = "An error occurred") => {
  const errorMessage = error && error.message ? error.message : message;
  return res.status(CLIENT_ERROR).json({
    status: false,
    message: errorMessage,
    data: {},
  });
};

function generateEmailTemplate(userName,verificationCode) {
  return `
  <div style="font-family: sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="text-align: center; color: #333333; margin-bottom: 24px;">🔐 Email Verification</h2>
      <p style="font-size: 16px; color: #555555;">Hello, ${userName}</p>
      <p style="font-size: 16px; color: #555555;">Thank you for signing up. To complete your registration, please use the verification code below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; background-color: #4CAF50; color: #ffffff; font-size: 22px; font-weight: bold; padding: 6px 24px; border-radius: 3px; letter-spacing: 2px;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #555555; #555555; margin-bottom: 0px;">This code is valid for the next <strong>2 minutes</strong>.</p>
      <p style="font-size: 16px; color: #555555; #555555; margin-bottom: 0px;">If you did not request this verification, you can safely ignore this email.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="http://localhost:3000/verification" style="display: inline-block; padding: 8px 16px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 3px; font-weight: bold;">
          Verify Your Account
        </a>
      </div>
      <p style="font-size: 14px; color: #999999; margin-top: 32px; text-align: center;">This is an automated message. Please do not reply.</p>
      <p style="font-size: 14px; color: #999999; text-align: center;">&copy; ${new Date().getFullYear()} RGTS SOFTWARE. All rights reserved.</p>
    </div>
  </div>
  `;
}


module.exports = {
  handleSuccess,
  handleError,
  generateEmailTemplate,
};
