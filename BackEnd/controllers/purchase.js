const express = require('express');
const Razorpay = require('razorpay');
const Order=require('../model/orders');


exports.purchasePremium=async (req,res)=>{
    try{

        var rzp=new Razorpay({
            key_id:'rzp_test_MzT1qkn9tGL3ma',
            key_secret:'3kdzTOVmfK3yBbZTyunDQfKz'
        })
        var options = {
            amount: 2000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };

        rzp.orders.create(options,(err,order)=>{
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
exports.updateTransactionStatus=async (req,res)=>{
    try{
        const {payment_id,order_id}=req.body;
        console.log(req.body);
        console.log(payment_id,order_id)
        const order=await Order.findOne({where:{orderid:order_id}})
        const promise1= order.update({paymentid: payment_id ,status:'SUCCESSFUL'})
        const promise2= req.user.update({isPremium:true})
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({sucess:true,message:"Transaction Successfull"})
        }).catch(err=>console.log(err))
            
            

    }catch(err){
        console.log(err)
        return res.status(402).json({sucess:true,message:"Something went Wrong"})
    }
}