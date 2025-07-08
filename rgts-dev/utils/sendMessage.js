const axios = require('axios');

// Twilio credentials
const accountSid = '';  // Replace with your Twilio Account SID
const authToken = '';    // Replace with your Twilio Auth Token
const twilioPhoneNumber = ''; // Replace with your Twilio number

	



/**
 * Ensure that the phone number contains the '+' sign at the beginning.
 * 
 * @param {string} phoneNumber - The phone number to check and format.
 * @returns {string} - The formatted phone number with '+' if missing.
 */
addPlusSignIfMissing  = async(phoneNumber) =>{
  if (!phoneNumber) {
    throw new Error('Phone number is required.');
  }

  // Check if the phone number already starts with a '+'
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;  // Return the phone number as is if it already starts with '+'
  }

  // If the phone number doesn't start with '+', add it
  return `+${phoneNumber}`;
}




/**
 * Sends OTP via SMS using Twilio's API
 * 
 * @param {string} phoneNumber - The recipient phone number
 * @param {string} otp - The OTP to be sent
 * @returns {Promise<object>} - Response from the Twilio API
 */
exports.sendOtpSMS = async(phone, otp)=>{
  const phoneNumber  = await addPlusSignIfMissing(phone); 
  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        Body: `${otp}`,
        From: twilioPhoneNumber,
        To: phoneNumber
      }),
      {
        auth: {
          username: accountSid,
          password: authToken
        }
      }
    );

    return response.data;  // Returns the response data from Twilio API
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
}

