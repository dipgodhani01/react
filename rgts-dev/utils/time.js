exports.convertTimeToTz = (time, tz) => {
  var moment = require('moment-timezone');
  var utcDate = moment.utc(time);
  var tzDate = utcDate.tz(tz);
  return tzDate.format();
}

exports.convertTimeToUTC = (date) => {
  var moment = require('moment-timezone');
  var dt = moment(date,"DD-MM-YYYY");
  var utcDate = moment.utc(dt);
  var time = utcDate.format("HH:mm:ss");
  var date = utcDate.format("DD-MM-YYYY");  
  var dateTime = {date:date,time:time};
  return dateTime;
}


exports.getUTCTime = ()=>{
  var moment = require('moment-timezone');
  return moment.utc().format("DD-MM-YYYY HH:mm:ss");
}

exports.utcTime = ()=>{
  var moment = require('moment-timezone');
  return moment.utc().format("DD-MM-YYYY HH:mm:ss");
}



