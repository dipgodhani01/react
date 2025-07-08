
const { convertTimeToUTC } = require("../utils/time")
var moment = require('moment-timezone');
exports.convertTime = (req, res, next) => {
    const {date,time} = req.body;
    try {      
        var dateParts = date.split("-");       
        var newDate  = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        const dateTime = new Date(newDate+" "+ time);
        const utctime  = convertTimeToUTC(dateTime); 
        req.body.date = utctime.date;
        req.body.time = utctime.time;
        next();
    } catch (exception) {
        c(exception);
        res.status(400).json({status:false,message:"Time convert issue.",data:{}});
    }
  }
  