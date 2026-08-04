import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

export const createOrder = async(req,res)=>{
    const razorpay = new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    });

    try{
        const {bookingId}=req.body;
        const booking=await Booking.findById(bookingId);

        if(!booking){

            return res.status(404).json({
                success:false,
                message:"Booking not found"
            })
        }

        const options={
            amount:booking.estimatedCost*100,
            currency:"INR",
            receipt:`receipt_${booking._id}`
        };

        const order=await razorpay.orders.create(options);

        const payment=await Payment.create({
            booking:booking._id,
            user:req.user._id,
            razorpayOrderId:order.id,
            amount:booking.estimatedCost
        });

        return res.status(201).json({
            success:true,
            order,
            payment
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

};

export const verifyPayment = async (req, res) => {

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed"
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {

            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });

        }

        payment.razorpayPaymentId = razorpay_payment_id;

        payment.status = "Paid";

        await payment.save();

        await Booking.findByIdAndUpdate(
            payment.booking,
            {
                paymentStatus: "Paid"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment Successful"
        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

export const getMyPayments = async (req, res) => {
    try {
        const payments = await Payment.find({
            user: req.user._id
        })
        .populate("booking")
        .sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};