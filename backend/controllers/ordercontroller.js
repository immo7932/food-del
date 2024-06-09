import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  timeout: 120000 // 2 minutes
});

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const { userId, items, amount, address } = req.body;

    // Ensure required fields are present
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create new order in database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Map items to Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80 // Ensure correct unit amount
      },
      quantity: item.quantity
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    // Respond with session URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ success: false, message: "Error creating Stripe session" });
  }
}


    const verifyOrder = async (req, res)=>{
          const {orderId, success} = req.body;
          try {
            if(success == "true"){
              await orderModel.findByIdAndUpdate(orderId, {payment : true});
              res.json({success : true, message : "Paid"})
            }
            else{
              await orderModel.findByIdAndDelete(orderId);
              res.json({success: false, message : "Not Paid"})
            }
          } catch (error) {
            console.log(error)
            res.json({success : false, message : "Error"})
          }
    }


    // user orders
    const userOrders = async(req, res) =>{
      try {
        
      } catch (error) {
        
      }

    }
export { placeOrder, verifyOrder, userOrders}
