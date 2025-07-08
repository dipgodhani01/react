const Payment = require('../../models/Payment')
const Payout = require('../../models/Payout')
const mongoose = require('mongoose');
const {SUCCESS,CLIENT_ERROR } = require("../../config/responseCodes")
var moment = require('moment-timezone');

// get pending booking list
exports.getPendingPayout = async (req,res)=>{
    try {
        const { search } = req.body;
        var payments = await Payment.aggregate([
            {
                $lookup: {
                from: 'bookings', // The name of the collection to join with
                localField: 'booking', // Field from the Payment collection
                foreignField: '_id', // Field from the Booking collection that matches
                as: 'bookings' // Alias for the joined data
                }
            },
            { $unwind: { path: '$bookings', preserveNullAndEmptyArrays: true } },

            // Lookup listener details
            {
                $lookup: {
                from: 'users', // or 'listeners' if separate collection
                localField: 'listenerId',
                foreignField: '_id',
                as: 'listener'
                }
            },
            { $unwind: { path: '$listener', preserveNullAndEmptyArrays: true } },

            {
                $match: {
                  'bookings.bookingStatus': { $nin: ['Pending', 'AutoCancel','Cancel'] },
                  status: 'succeeded',
                  listenerFee: { $gt: 0 },
                  refunded:false  
                }
            },
            {
                $project: {
                paidAmount: 1,
                appFee: 1,
                listenerFee: 1,
                paymentType: 1,
                stripePaymentId: 1,
                status: 1,
                refunded: 1,
                refundAmount: 1,
                bookings: { _id: 1, createdAt:1,bookingStatus:1 },  
                listener: { _id: 1, name: 1, email: 1 }  
                }
            },
        ]).exec();
        payments = JSON.parse(JSON.stringify(payments));

        const result = await Payout.aggregate([
            { $match: { isDeleted: false } },
            {
              $group: {
                _id: null,
                totalPaidAmount: { $sum: "$paidAmount" }
              }
            }
          ]);
        const PayoutCount = result[0]?.totalPaidAmount || 0;

          // Add PayoutCount to each item
        var paymentsWithPayout = payments.map((item) => ({
        ...item,
        PayoutCount
      }));

        // if (search) {
        //     const keyword = search.toLowerCase();
        //     paymentsWithPayout = paymentsWithPayout.filter(item => {
        //         const listenerName = item?.listener?.name?.toLowerCase() || '';
        //         return listenerName.includes(keyword);
        //     });
        // }
        
        res.status(SUCCESS).json({
            status:true,message:"Record has been fetched successfully.",
            data:paymentsWithPayout,
        }) 
    
    } catch (err) {
            return res.status(CLIENT_ERROR).json({status:false,message:err.message,data:{}})
    }
}





