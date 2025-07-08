require('dotenv').config();

module.exports = {
    SUCCESS:200, //Ok
    SUCCESS1:201, //Success
    SUCCESS4:204, //Success
    LOGIN_REQUIRED:301, //Login required
    CLIENT_ERROR:400, //There was a parsing error. OR  BAD REQUEST OR VALIDATION 
    FORBIDDEN:403,
    SERVER_ERROR:500,
    VALIDATION_ERROR:406,
    UNAUTHORIZED_USER:401,
    DAILY_REPORT_ALREADY_ADDED:420, // for new take 430,440,450,460
    INACTIVE_USER:401
}
