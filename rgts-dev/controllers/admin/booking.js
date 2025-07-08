const Booking = require('../../models/Booking')
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
exports.getAllbookings = async (req,res)=>{
    try {

        const { id, status, date, fromDate, toDate } = req.body;
        const bookingStatus = status ;

         // Set booking status conditions
         if (["Pending", "Confirm", "Cancel"].includes(bookingStatus)) {
            var filter = {bookingPaymentStatus:"Success",$or:[{bookingStatus:bookingStatus}]};

        } else {
            var filter = {bookingPaymentStatus:"Success"}
        }

         // Convert and apply date filters
         if (date) {
            filter.date = await dateParseString(date);
        } else if (fromDate && toDate) {
            filter.date = {
                $gte: new Date(fromDate),  // From date
                $lte: new Date(toDate),    // To date
            };
        } else if (fromDate) {
            filter.date = { $gte: new Date(fromDate) };
        } else if (toDate) {
            filter.date = { $lte: new Date(toDate) };
        }

         // Fetch bookings with population
         let bookings = await Booking.find(filter)
         .populate({ path: "listenerId", select: "name image" })
         .populate({ path: "userId", select: "name image" })
         .sort({ _id: -1 });

         
        bookings = JSON.parse(JSON.stringify(bookings));
        for (const [index,booking] of bookings.entries()) {
            bookings[index].date = await formatDate(booking.date);
        }

        const totalConfirm = await Booking.countDocuments({bookingPaymentStatus:"Success",bookingStatus:"Confirm"});
        const totalPending = await Booking.countDocuments({bookingPaymentStatus:"Success",bookingStatus:"Pending"});
        const totalCancel = await Booking.countDocuments({bookingPaymentStatus:"Success",bookingStatus:"Cancel"});
        const bookingCount = await Booking.countDocuments({bookingPaymentStatus:"Success"});

        res.status(SUCCESS).json({
            status:true,
            message:"Booking record has been fetched successfully.",
            data:bookings,
            counts: {
                pending: totalPending,
                confirm: totalConfirm,
                booking:bookingCount,
                cancel:totalCancel,
                pendingConfirmation:0
            }
        })
              
    } catch (err) {
        return res.status(CLIENT_ERROR).json({status:false,message:err.message,data:{}})
    }
}

// get All qucick bookings datat
exports.getAllQuickbookings = async (req,res)=>{
    try {
        const {id} = req.body;
        const bookingStatus = req.body.bookingStatus || "Pending";
        var date = req.body.date;
        if(date){
            date = await dateParseString(date);
        }
        var todayDate = moment().utc().toDate();
        var todayDate = todayDate.setHours(0, 0, 0, 0); 
        var filter = {};
        var bookings = await Booking.find(filter).populate({path:"listenerId",select:"name image"}).populate({path:"userId",select:"name image"}).sort({"_id":-1});
        bookings = JSON.parse(JSON.stringify(bookings));
        for (const [index,booking] of bookings.entries()) {
            bookings[index].date = await formatDate(booking.date);
        }
        res.status(SUCCESS).json({
            status:true,
            message:"Booking record has been fetched successfully.",
            data:bookings
        })
              
    } catch (err) {
        return res.status(CLIENT_ERROR).json({status:false,message:err.message,data:{}})
    }
}





