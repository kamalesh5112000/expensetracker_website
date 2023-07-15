const express = require('express');
const Razorpay = require('razorpay');
const Order=require('../model/orders');


exports.purchasePremium=async (req,res)=>{
    try{

        var rzp=new Razorpay({
            key_id:'rzp_test_bBVW3zYv2rRWif',
            key_secret:'W0dWU3qlR5p4r5uAXy8i54a5'
        })
        const amount = 255;

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                console.log(err)
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}
            ).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            })
        })
    }catch(err){
        console.log(err)
        return res.status(202).json("Unsuccefull")
    }
}