const Payment = require('../../models/Payment')
const Refund = require('../../models/Refund')
const CallHistory = require('../../models/CallHistory')
const User = require('../../models/User')
const mongoose = require('mongoose');
const { logger,formatDate,dateParseString} = require('../../utils')
const { convertTimeToUTC } = require('../../utils/time')
const fs = require("fs")
const {SUCCESS,CLIENT_ERROR } = require("../../config/responseCodes")
var moment = require('moment-timezone');
var utcTime = moment.utc().format("DD-MM-YYYY HH:mm:ss");

// get pending booking list
exports.getAllRefund = async (req,res)=>{
    try {

        const { id, status, date, fromDate, toDate,search } = req.body;
        const bookingStatus = status ;
        var filter = {}
        // Convert and apply date filters
        

          // Apply date filters
        if (date) {
            filter.createdAt = new Date(date); // simplified
        } else if (fromDate && toDate) {
            filter.createdAt = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            };
        } else if (fromDate) {
            filter.createdAt = { $gte: new Date(new Date(fromDate).setHours(0,0,0,0)) ,
                $lte: new Date(new Date(fromDate).setHours(23, 59, 59, 999)),};
        } else if (toDate) {
            filter.createdAt = { $lte: new Date(toDate)};
        }
         // Fetch bookings with population
         let payments = await Refund.find()
         .populate({ path: "payment", select: "user listenerId", populate: [{ path: "user", select: "name" },{ path: "listenerId", select: "name" }]})
         .sort({ _id: -1 });
         payments = JSON.parse(JSON.stringify(payments));

         if (search) {
            const keyword = search.toLowerCase();
            payments = payments.filter(refund => {
                const userName = refund?.payment?.user?.name?.toLowerCase() || '';
                const listenerName = refund?.payment?.listenerId?.name?.toLowerCase() || '';
                return userName.includes(keyword) || listenerName.includes(keyword);
            });
        }
        res.status(SUCCESS).json({
            status:true,
            message:"Refund record has been fetched successfully.",
            data:payments
        })
              
    } catch (err) {
        return res.status(CLIENT_ERROR).json({status:false,message:err.message,data:{}})
    }
}





