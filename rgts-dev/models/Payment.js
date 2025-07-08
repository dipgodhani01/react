const mongoose = require("mongoose");
const {Schema} = mongoose;
const {table} = require('../config/tables')

const {utcTime} = require('../utils/time');

// Create SCHEMA
const PaymentSchema = new mongoose.Schema(
{
    booking:{type: Schema.ObjectId, ref: 'bookings'}, 
    user:{type: Schema.ObjectId, ref: 'Users'}, 
    listenerId:{type: mongoose.Schema.Types.ObjectId,ref: "Users"}, // Listener
    stripePaymentId:{type: String,default: ""},    
    clientSecret:{type: String,default: ""},
    currency:{type: String,default: ""},       
    paidAmount:{type: Number,default: 0},
    amount:{type: Number,default: 0},
    discountAmount:{type: Number,default: 0},
    appFee:{type: Number,default: 0}, // Service Fee
    listenerFee:{type: Number,default: 0}, // payment, after service fees 
    customerId:{type: String,default: ""},
    plan:{type: Schema.ObjectId,ref: 'plan'},
    chargeId:{type: String,default: ""},
    balance:{type: Number,default: 0},
    availableBalance:{type: Number,default: 0},
    spentBalance: { type: Number, default: 0 }, // New field for spent balance
    spentVents: { type: Number, default: 0 }, // New field for spent balance
    expiryDate:{type: String},
    status: {type: String,required: true,
        enum: ["incomplete", "canceled","succeeded","processing"],
        default: "incomplete"
    },
    paymentType: {
      type: String,
      enum: ["booking", "planPurchase","quickCall"],
      default: "booking"
    },
    refunded: {type: Boolean,default: false},
    refundAmount:{type: Number,default: 0},
    isDeleted:{type: Boolean,default: false},  
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
    
  } 
);
// Create Model

// PaymentSchema.virtual('paymentId').get(function() { 
//     return this._id; 
// });


const Payment = mongoose.model(table.payments, PaymentSchema);
module.exports = Payment;


