const { sendEmail } = require("../services/userService");
const { generateEmailTemplate } = require("./helper");

exports.sendVarificationEmail = async (userName,verificationCode, email, res) => {  
  try {
    const message = generateEmailTemplate(userName,verificationCode);
    sendEmail({ email, subject: "Your Verification Code", message });
    return true;
  } catch (error) {
    return false;
  }
};
