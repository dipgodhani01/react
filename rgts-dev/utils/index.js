const path = require("path");
const { startTime, gapTimeInMinutes, endTime } = require("../config");
const { createLogger, format, transports } = require("winston");

exports.getAccessLevel = (type) => {
  if (type === "Administrator") return 3;
  else if (type === "Listener") return 2;
  else if (type === "User") return 1;
  else return 1;
};

exports.getTimeSlot = (current_time) => {
  let hours = parseInt(current_time.split(":")[0]);
  let minutes = parseInt(current_time.split(":")[1]);

  const startHours = parseInt(startTime.split(":")[0]);
  const startMinutes = parseInt(startTime.split(":")[1]);

  const endHours = parseInt(endTime.split(":")[0]);
  const endMinutes = parseInt(endTime.split(":")[1]);

  if (hours >= startHours && hours <= endHours) {
    minutes += gapTimeInMinutes;
    if (minutes >= 60) {
      hours++;
      minutes -= 60;
    }
    if (hours > startHours && hours < endHours)
      return formatTime(hours, minutes);
    else if (hours === startHours) {
      if (minutes >= startMinutes) return formatTime(hours, minutes);
      else return "error";
    } else if (hours === endHours) {
      if (minutes <= endMinutes) return formatTime(hours, minutes);
      else return "error";
    } else return "error";
  } else return "error";
};

formatTime = (hours, minutes) => {
  if (hours >= 0 && hours < 10) hours = "0" + hours;
  if (minutes >= 0 && minutes < 10) minutes = "0" + minutes;
  return `${hours}:${minutes}`;
};

const today = new Date();
const fileName = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;

exports.logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  defaultMeta: {
    service: "user-service",
  },
  transports: [
    new transports.File({
      filename: path.join(__dirname, `../logs/${fileName}_error.log`),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, `../logs/${fileName}_info.log`),
    }),
    new transports.Console({ format: format.simple() }),
  ],
});

exports.getRandomString = function (length = 16) {
  var result = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.emailToUsername = (email) => {
  const username = email.match(/^([^@]*)@/)[1];
  return username;
};

exports.generateRandomName = () => {
  return "testtsts";
};
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


// Define a function to format the date
exports.formatDate = async (date) => {
  var date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero based
  const year = date.getFullYear();

  // Ensure two digits for day and month
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // Return the formatted date string
  return `${formattedDay}-${formattedMonth}-${year}`;
};

// Define a function to format the date
exports.dateParseString = async (date) => {
  const bookingDate = date.split("-").reverse().join("-");
  const newBookingDate = new Date(bookingDate);
  const utcDate = newBookingDate.toUTCString();
  return utcDate;
};
