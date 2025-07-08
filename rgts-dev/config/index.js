require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3100,
  uri: process.env.DATABASE_URI || "mongodb+srv://rgts_2:sZNUVnLMaok20rbn@rgts2.0ngbpx5.mongodb.net/RGTS_2",
  gapTimeInMinutes: process.env.GAP_TIME_IN_MINUTES || 5,
  startTime: process.env.START_TIME || "10:00",
  endTime: process.env.END_TIME || "16:00",
  secretKey: process.env.JWT_SECRET_KEY || "jwtgetmegicsecret",
  tokenExpiry: process.env.JWT_EXPIRE || "1d",
  cookiesExpiry: process.env.COOKIE_EXPIRE || 1,
  notificationUri: process.env.NOTIFICATION_URI || "localhost:3100/api/v1/notifications",
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT || 60484,
  redisPassword: process.env.REDIS_PASSWORD || "",
  session_key:"magicGet",
	thekey:"magicGet",
	perPage:100,
  notificationKey : "",
  SMTP_HOST:process.env.SMTP_HOST || '',
  SMTP_SERVICE:process.env.SMTP_SERVICE || '',
  SMTP_PORT:process.env.SMTP_PORT || '465',
  SMTP_MAIL:process.env.SMTP_MAIL || '',
  SMTP_PASSWORD:process.env.SMTP_PASSWORD || '',
}



